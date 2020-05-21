import os
import numpy as np
import cv2

def digit_recog(digit1):
    test_digits = []
    list = []
    root = "Training_data"
    for item in os.listdir(root):
        if item == ('.DS_Store'):
            continue
        else:
            list.append(item)
    list = sorted(list)

    digits = []
    for folder in list:
        subfolder = os.listdir('Training_data/' + folder)
        for digit in subfolder:
            if digit == ('.DS_Store'):
                continue
            else:
                read = cv2.imread("Training_data/" + folder + "/" + digit, cv2.IMREAD_GRAYSCALE)
                digit = read.flatten()
                digits.append(digit)

    digits = np.array(digits, dtype=np.float32)
    k = np.arange(10)
    digit_labels = np.repeat(k, 80)

    knn = cv2.ml.KNearest_create()
    knn.train(digits, cv2.ml.ROW_SAMPLE, digit_labels)
    digit = cv2.imread(digit1, cv2.IMREAD_GRAYSCALE)
    digit = digit.flatten()
    test_digits.append(digit)
    test_digits = np.array(test_digits, dtype=np.float32)
    ret, result, neighbours, dist = knn.findNearest(test_digits, k=5)
    for item in result:
        for item1 in item:
            return int(item1)

