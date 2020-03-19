from scipy.spatial import distance as dist
from imutils.video import FileVideoStream
from imutils.video import VideoStream
from imutils import face_utils
import numpy as np
import imutils
import time
import dlib

import sys


def log(message):
    print(message)
    sys.stdout.flush()


blinked = True
blinkstart = True


def eye_aspect_ratio(eye):

    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])

    C = dist.euclidean(eye[0], eye[3])

    ear = (A + B) / (2.0 * C)

    return ear


def start_detector():
    global blinked
    global blinkstart
    log('Detector started')

    EYE_AR_THRESH = 0.25
    EYE_AR_CONSEC_FRAMES = 9

    COUNTER = 0
    TOTAL = 0

    log("[INFO] loading facial landmark predictor...")
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor(
        "./scripts/shape_predictor_68_face_landmarks.dat")

    (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
    (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

    log("[INFO] starting video stream thread...")

    fileStream = True
    vs = VideoStream(src=0).start()

    fileStream = False
    time.sleep(1.0)

    while True:
        time.sleep(0.03)

        if fileStream and not vs.more():
            break

        frame = vs.read()

        frame = cv2.flip(frame, 1)
        frame = imutils.resize(frame, width=450)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        rects = detector(gray, 0)

        for rect in rects:

            shape = predictor(gray, rect)
            shape = face_utils.shape_to_np(shape)

            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)

            ear = (leftEAR + rightEAR) / 2.0

            if not blinked and ear < EYE_AR_THRESH:
                COUNTER += 1
                if COUNTER == 2:
                    blinkstart = True

                else:
                    blinkstart = False
                if COUNTER >= EYE_AR_CONSEC_FRAMES:
                    TOTAL += 1
                    blinked = True
                    blinkstart = False
                    log(f'Blinked')
            else:
                blinkstart = False
                blinked = False
                COUNTER = 0

    vs.stop()


start_detector()
