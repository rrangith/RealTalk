from utils import detector_utils as detector_utils
import cv2
import tensorflow as tf
import datetime

class Video(object):
    def __init__(self):
        detection_graph, sess = detector_utils.load_inference_graph()

        cap = cv2.VideoCapture(0) #0 gets computer's default camera
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 750)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 500)

        start_time = datetime.datetime.now()
        im_width, im_height = (cap.get(3), cap.get(4))
        num_hands_detect = 2 # max number of hands we want to detect/track, can scale this up
        min_threshold = 0.2

        self.total_displacement = 0
        old_points = [None]*num_hands_detect
        self.num_frames = 1 #make this 1 to avoid division by 0 error

        cv2.namedWindow('Single-Threaded Detection', cv2.WINDOW_NORMAL)

        while True:
            # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
            ret, image_np = cap.read()
            image_np = cv2.flip(image_np, 1)
            # image_np = cv2.flip(image_np, 1)
            try:
                image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
            except:
                print("Error converting to RGB")

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
            print(self.total_displacement/(10*self.num_frames))
            detector_utils.draw_face(im_width, im_height, image_np)


            # Display FPS on frame:
            detector_utils.draw_fps_on_image("FPS : " + str(int(fps)), image_np)

            cv2.imshow('Single-Threaded Detection', cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR))

            if cv2.waitKey(25) & 0xFF == ord('q'):
                cv2.destroyAllWindows()
                break

    def getTotalDisplacement():
        return self.total_displacement

    def getNumFrames():
        return self.num_frames

v = Video()
