import cv2
import numpy as np
import os

path=os.getcwd()


def center(image,name):
    image = cv2.imread(image, cv2.IMREAD_GRAYSCALE)
    height, width = image.shape
    wi=(width/2)
    he=(height/2)

    ret,thresh = cv2.threshold(image,95,255,0)

    M = cv2.moments(thresh)

    cX = int(M["m10"] / M["m00"])
    cY = int(M["m01"] / M["m00"])

    offsetX = (wi-cX)
    offsetY = (he-cY)
    T = np.float32([[1, 0, offsetX], [0, 1, offsetY]])
    centered_image = cv2.warpAffine(image, T, (width, height))

    cv2.imwrite(path+'/images_written/'+name,centered_image)

    return centered_image



