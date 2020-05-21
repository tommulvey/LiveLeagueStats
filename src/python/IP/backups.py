# list=[]
# root = "Training_data"
# for item in os.listdir(root):
#     if item==('.DS_Store'):
#         continue
#     else:
#         list.append(item)
# list=sorted(list)
#
# digits=[]
# for folder in list:
#     subfolder= os.listdir('Training_data/'+folder)
#     for digit in subfolder:
#         if digit == ('.DS_Store'):
#             continue
#         else:
#             read=cv2.imread("Training_data/"+folder+"/"+digit,cv2.IMREAD_GRAYSCALE)
#             digit=read.flatten()
#             digits.append(digit)
#
# digits=np.array(digits, dtype=np.float32)
# k = np.arange(10)
# digit_labels = np.repeat(k, 20)
#
#
# test_digits=[]
# test=cv2.imread("digit.jpg",cv2.IMREAD_GRAYSCALE)
# y1,x1=test.shape
# test = cv2.resize(test, (x1 + 2, y1 + 0), interpolation=cv2.INTER_NEAREST)
# test=test.flatten()
# test_digits.append(test)
# test_digits = np.array(test_digits, dtype=np.float32)
#
# # KNN
# knn = cv2.ml.KNearest_create()
# knn.train(digits, cv2.ml.ROW_SAMPLE, digit_labels)
# ret, result, neighbours, dist = knn.findNearest(test_digits, k=3)
#
# print(result)




# digits = cv2.imread("digits.png", cv2.IMREAD_GRAYSCALE)
# test_digits = cv2.imread("Training_data/digit50.jpg", cv2.IMREAD_GRAYSCALE)
#
# rows = np.vsplit(digits, 50)
# cells = []
# for row in rows:
#     row_cells = np.hsplit(row, 50)
#     for cell in row_cells:
#         cell = cell.flatten()
#         cells.append(cell)
#
# cells = np.array(cells, dtype=np.float32)
#
#
#
# k = np.arange(10)
# cells_labels = np.repeat(k, 250)
#
#
#
#
# #test_digits = np.vsplit(test_digits, 50)
# test_cells = []
# # for d in test_digits:
# #     cv2.imwrite("digit.jpg", d)
# #     d = d.flatten()
# #     test_cells.append(d)
# y,x=test_digits.shape
# resized = cv2.resize(test_digits, (x + 11, y + 6), interpolation=cv2.INTER_NEAREST)
# writedigit=cv2.imwrite("resized.jpg", resized)
# resized=-resized.flatten()
# test_cells.append(resized)
# test_cells = np.array(test_cells, dtype=np.float32)
#
#
# # KNN
# knn = cv2.ml.KNearest_create()
# knn.train(cells, cv2.ml.ROW_SAMPLE, cells_labels)
# ret, result, neighbours, dist = knn.findNearest(test_cells, k=3)
#
#
# print(result)
