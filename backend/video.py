from utils import detector_utils as detector_utils
import cv2
import tensorflow as tf
import datetime

from statistics import mode

from keras.models import load_model
import numpy as np

from utils.datasets import get_labels
from utils.inference import detect_faces
from utils.inference import draw_text
from utils.inference import draw_bounding_box
from utils.inference import apply_offsets
from utils.inference import load_detection_model
from utils.preprocessor import preprocess_input

from PIL import Image
import queue
import base64
import io


class Video(object):
    def __init__(self):
        self.total_displacement = 0
        self.num_frames = 1 #make this 1 to avoid division by 0 error

        self.current_emotion = 'neutral'

        self.emotions = {}
        self.emotions['happy'] = 0
        self.emotions['sad'] = 0
        self.emotions['angry'] = 0
        self.emotions['neutral'] = 0
        self.emotions['surprise'] = 0
        self.emotions['fear'] = 0

        self.image_queue = queue.Queue()


    def run(self):
        detection_graph, sess = detector_utils.load_inference_graph()

        # parameters for loading data and images
        detection_model_path = 'haarcascade_frontalface_default.xml'
        emotion_model_path = 'fer2013_mini_XCEPTION.102-0.66.hdf5'
        emotion_labels = get_labels('fer2013')

        # hyper-parameters for bounding boxes shape
        frame_window = 10
        emotion_offsets = (20, 40)

        # loading models
        face_detection = load_detection_model(detection_model_path)
        emotion_classifier = load_model(emotion_model_path, compile=False)

        # getting input model shapes for inference
        emotion_target_size = emotion_classifier.input_shape[1:3]

        # starting lists for calculating modes
        emotion_window = []

        start_time = datetime.datetime.now()
        im_width, im_height = (400, 350)
        num_hands_detect = 2 # max number of hands we want to detect/track, can scale this up
        min_threshold = 0.2

        old_points = [None]*num_hands_detect
        cv2.namedWindow('Single-Threaded Detection', cv2.WINDOW_NORMAL)

        while True:
            # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
            if self.image_queue.empty():
                continue
            img_data = base64.b64decode(str(self.image_queue.get()))
            image_np = np.asarray(Image.open(io.BytesIO(img_data)))
            image_np = cv2.flip(image_np, 1)
            gray_image = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

            faces = detect_faces(face_detection, gray_image)

            # Actual detection. Variable boxes contains the bounding box cordinates for hands detected,
            # while scores contains the confidence for each of these boxes.
            # Hint: If len(boxes) > 1 , you may assume you have found atleast one hand (within your score threshold)

            boxes, scores = detector_utils.detect_objects(image_np, detection_graph, sess)

            valid_hands = 0
            calc_displacement = False
            for score in scores:
                if score > min_threshold:
                    valid_hands += 1
            if valid_hands == num_hands_detect:
                calc_displacement = True #tell function to return new displacement

            # draw bounding boxes on frame
            self.total_displacement += detector_utils.draw_box_on_image(num_hands_detect, min_threshold, scores, boxes, im_width, im_height, image_np, old_points, calc_displacement) #0.2 is the min threshold
            # Calculate Frames per second (FPS)
            self.num_frames += 1
            elapsed_time = (datetime.datetime.now() - start_time).total_seconds()
            fps = self.num_frames / elapsed_time

            if self.current_emotion in self.emotions:
                self.emotions[self.current_emotion] += 1
            else:
                self.emotions[self.current_emotion] = 1

            print(self.total_displacement/(10*self.num_frames), self.current_emotion, self.emotions)

            for face_coordinates in faces:
                x1, x2, y1, y2 = apply_offsets(face_coordinates, emotion_offsets)
                gray_face = gray_image[y1:y2, x1:x2]
                try:
                    gray_face = cv2.resize(gray_face, (emotion_target_size))
                except:
                    continue

                gray_face = preprocess_input(gray_face, True)
                gray_face = np.expand_dims(gray_face, 0)
                gray_face = np.expand_dims(gray_face, -1)
                emotion_prediction = emotion_classifier.predict(gray_face)
                emotion_probability = np.max(emotion_prediction)
                emotion_label_arg = np.argmax(emotion_prediction)
                self.current_emotion = emotion_labels[emotion_label_arg]
                emotion_window.append(self.current_emotion)

                if len(emotion_window) > frame_window:
                    emotion_window.pop(0)
                try:
                    emotion_mode = mode(emotion_window)
                except:
                    continue

                draw_bounding_box(face_coordinates, image_np)


            # Display FPS on frame:
            detector_utils.draw_fps_on_image("FPS : " + str(int(fps)), image_np)

            cv2.imshow('Single-Threaded Detection', cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR))

            if cv2.waitKey(25) & 0xFF == ord('q'):
                cv2.destroyAllWindows()
                break

    def getTotalDisplacement(self):
        return self.total_displacement

    def getNumFrames(self):
        return self.num_frames

    def getCurrentEmotion(self):
        return self.current_emotion

    def getEmotions(self):
        return self.emotions
