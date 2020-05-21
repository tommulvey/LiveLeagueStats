import os
import numpy as np
import cv2

def colon_recog(colon1):
    list=[]
    root = "Colon_Training"
    for item in os.listdir(root):
        if item==('.DS_Store'):
            continue
        else:
            list.append(item)
    list=sorted(list)

    colons = []
    for folder in list:
        subfolder= os.listdir('Colon_Training/'+folder)
        for colon in subfolder:
            if colon == '.DS_Store':
                continue
            else:
                read=cv2.imread("Colon_Training/"+folder+"/"+colon,cv2.IMREAD_GRAYSCALE)
                colon = read.flatten()
                colons.append(colon)

    test_colon = []
    colons = np.array(colons, dtype=np.float32)
    k=np.arange(2)
    colon_labels = np.repeat(k, 1000)

    knn = cv2.ml.KNearest_create()
    knn.train(colons, cv2.ml.ROW_SAMPLE, colon_labels)
    colon = cv2.imread(colon1, cv2.IMREAD_GRAYSCALE)
    colon = colon.flatten()
    test_colon.append(colon)
    test_colon = np.array(test_colon, dtype=np.float32)
    ret, result, neighbours, dist = knn.findNearest(test_colon, k=5)
    for item in result:
        for item1 in item:
            return int(item1)


# def colon_recog(colon1):
#     root = "Training_data4"
#
#     colons = []
#     for colon in os.listdir(root):
#         print(colon)
#         if colon == '.DS_Store':
#             continue
#         else:
#             read = cv2.imread("Training_data4/" + colon, cv2.IMREAD_GRAYSCALE)
#             colon = read.flatten()
#             colons.append(colon)
#
#     test_colon = []
#     colons = np.array(colons, dtype=np.float32)
#     k=np.arange(2)
#     colon_labels = np.repeat(k, 150)
#
#     knn = cv2.ml.KNearest_create()
#     knn.train(colons, cv2.ml.ROW_SAMPLE, colon_labels)
#     colon = cv2.imread(colon1, cv2.IMREAD_GRAYSCALE)
#     colon = colon.flatten()
#     test_colon.append(colon)
#     test_colon = np.array(test_colon, dtype=np.float32)
#     ret, result, neighbours, dist = knn.findNearest(test_colon, k=3)
#     print(result)
#     for item in result:
#         for item1 in item:
#             return int(item1)
#
#
# print(colon_recog("ColonResized.jpg"))




