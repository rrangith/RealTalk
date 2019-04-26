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

detection_graph, sess = detector_utils.load_inference_graph()

# parameters for loading data and images
detection_model_path = 'haarcascade_frontalface_default.xml'
emotion_model_path = 'fer2013_mini_XCEPTION.102-0.66.hdf5'
emotion_labels = get_labels('fer2013')

# loading models
face_detection = load_detection_model(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)

im_width, im_height = (400, 350)

num_hands_detect = 2 # max number of hands we want to detect/track, can scale this up
min_threshold = 0.2

def detect(image):
    img_data = base64.b64decode(str(image)
    image_np = np.asarray(Image.open(io.BytesIO(img_data)))
    image_np = cv2.flip(image_np, 1)
    gray_image = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

    faces = detect_faces(face_detection, gray_image)

    # Actual detection. Variable boxes contains the bounding box cordinates for hands detected,
    # while scores contains the confidence for each of these boxes.
    # Hint: If len(boxes) > 1 , you may assume you have found atleast one hand (within your score threshold)
    boxes, scores = detector_utils.detect_objects(image_np, detection_graph, sess)

    coords = detector_utils.get_coords(num_hands_detect, min_threshold, scores, boxes, im_width, im_height, image_np) #0.2 is the min threshold
