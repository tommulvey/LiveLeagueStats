import os
import numpy as np
import cv2
import pafy
from Digit_Recog import digit_recog
from Colon_Recog import colon_recog


def main():
    video = pafy.new("https://www.youtube.com/watch?v=tq_VWyvzsss")
    # video = pafy.new("https://www.youtube.com/watch?v=6kQ0rSqxmZY")
    mystream = video.getbestvideo()
    stream_url=mystream.url
    cap= cv2.VideoCapture(stream_url)

    ###########################################
    framerate=round(cap.get(cv2.CAP_PROP_FPS))
    time_interval=1
    print("Video Framerate: "+str(framerate))
    frames_read=0
    count=framerate
    number=3300
    ###########################################

    colonTemplate = cv2.imread("ColonTemplate.jpg",cv2.IMREAD_GRAYSCALE)
    y,x=colonTemplate.shape
    colonTemplate=cv2.resize(colonTemplate, (x + 3, y+10), interpolation = cv2.INTER_NEAREST)
    write_colon=cv2.imwrite("ColonResized.jpg", colonTemplate)

    ###########################################
    test_digits=[]
    countTest = 0
    while True:
        success, frame = cap.read()
        if success == False:
            break
        if (count%(framerate*time_interval)==0):
            show_image = cv2.imshow("image", frame)
            time=frame[75:100,940:990]

            colonposition=time[1:15,24:28]
            show_time = cv2.imshow("time", time)
            # y1,x1,z1=colonposition.shape
            # colonposition = cv2.resize(colonposition, (x1 + 3, y1 + 10), interpolation=cv2.INTER_NEAREST)
            # colonposition=cv2.cvtColor(colonposition, cv2.COLOR_BGR2GRAY)
            # colonposition=cv2.imwrite("colonTEST.jpg", colonposition)
            # show_colonposition=cv2.imshow("colon position", colonposition)
            # write_colon = cv2.imwrite("colonPosition" + str(number) + ".jpg", colonposition)
            # number += 1
            # if colon_recog("colonTEST.jpg")== 1:
            #     if countTest==0:
            #         print("Game has Started")
            #         countTest+=1
            #     show_time = cv2.imshow("time", time)
            #
            #     write_colon = cv2.imwrite("Colon_Training/0/colonPosition" + str(number) + ".jpg", colonposition)
            #     number += 1
            #     show_time = cv2.imshow("time", time)
            #
            #     ##############################################
            #     digit1 = time[0:14, 7:14]
            #     # show_digit1 = cv2.imshow("digit1", digit1)
            #     digit1=cv2.imwrite("digit1.jpg",digit1)
            #     digit1=cv2.imread("digit1.jpg",cv2.IMREAD_GRAYSCALE)
            #     y2,x2=digit1.shape
            #     digit1 = cv2.resize(digit1, (x2 + 2, y2 + 0), interpolation=cv2.INTER_NEAREST)
            #     digit1 = cv2.imwrite("digit1.jpg", digit1)
            #     digit5=cv2.imread("digit1.jpg")
            #     if digit_recog("digit1.jpg")==9:
            #         digit2312=cv2.imwrite("9/digitsample"+str(number)+".jpg",digit5)
            #     number+=1
            #     digit1=digit1.flatten()
            #     test_digits.append(digit1)
            #     # ####################################################
            #
            #     digit2 = time[0:14, 16:23]
            #     # show_digit2 = cv2.imshow("digit2", digit2)
            #     digit2 = cv2.imwrite("digit2.jpg", digit2)
            #     digit2 = cv2.imread("digit2.jpg", cv2.IMREAD_GRAYSCALE)
            #     y3, x3 = digit2.shape
            #     digit2 = cv2.resize(digit2, (x3 + 2, y3 + 0), interpolation=cv2.INTER_NEAREST)
            #     digit2 = cv2.imwrite("digit2.jpg", digit2)
            #     digit6=cv2.imread("digit2.jpg")
            #     if digit_recog("digit2.jpg") == 9:
            #         writeit = cv2.imwrite("9/digitsample" + str(number) + ".jpg", digit6)
            #     number+=1
            #
            #     # ####################################################
            #     #
            #     digit3 = time[0:14, 29:36]
            #     # show_digit3 = cv2.imshow("digit3", digit3)
            #     digit3 = cv2.imwrite("digit3.jpg", digit3)
            #     digit3 = cv2.imread("digit3.jpg", cv2.IMREAD_GRAYSCALE)
            #     y4, x4 = digit3.shape
            #     digit3 = cv2.resize(digit3, (x4 + 2, y4 + 0), interpolation=cv2.INTER_NEAREST)
            #     digit3 = cv2.imwrite("digit3.jpg", digit3)
            #     digit7=cv2.imread("digit3.jpg")
            #     if digit_recog("digit3.jpg") == 8:
            #         writeit = cv2.imwrite("8/?/digitsample" + str(number) + ".jpg", digit7)
            #         print('digit'+str(number)+'.jpg')
            #     number+=1
            #     # ####################################################
            #     #
            #     digit4 = time[0:14, 36:45]
            #     show_digit4 = cv2.imshow("digit4", digit4)
            #     digit4 = cv2.imwrite("digit4.jpg", digit4)
            #     digit8 = cv2.imread("digit4.jpg", cv2.IMREAD_GRAYSCALE)
            #     if digit_recog("digit3.jpg") == 8:
            #         writeit = cv2.imwrite("8/?/digitsample" + str(number) + ".jpg", digit7)
            #         print('digit'+str(number)+'.jpg')
            #     number+=1
            #     # ####################################################
            #     print(str(digit_recog("digit1.jpg"))+str(digit_recog("digit2.jpg"))+":"+str(digit_recog("digit3.jpg"))+str(digit_recog("digit4.jpg")))
            #     test_digits = np.array(test_digits, dtype=np.float32)
            #     ret, result, neighbours, dist = knn.findNearest(test_digits, k=3)
            #     for digit in result:
            #         print(digit, end='')
            #     print('\n')


                ####################################################

        frames_read+=1
        count+=1
        key = cv2.waitKey(1)
        if key == ord("e"):
            break
    ###########################################

    print("Frames in video:",count)
    print("Frames Processed:",frames_read)
    cap.release()
    cv2.destroyAllWindows()
    ##########################################

main()





