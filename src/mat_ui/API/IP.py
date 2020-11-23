import time
from flask import Flask,request
from flask_cors import CORS, cross_origin
import os
import numpy as np
import cv2
import pafy
import math
import threading

from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten

from keras.utils import to_categorical
import numpy as np
from BW_convert import binary_convert_colon,binary_convert
#from cutting import cropping1,cropping2,cropping3,cropping4
from keras.models import load_model
from center import center
from convert import convert
from check_digit import check_digit
from convert_time_from_fe import convert2

path = os.getcwd()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
url= "https://www.youtube.com/watch?v=bXFTmt-Pb2M"

video = pafy.new(url)
mystream = video.getbestvideo()
stream_url = mystream.url
cap = cv2.VideoCapture(stream_url)
model = load_model(path+'/colon_model.h5')
digit_model = load_model(path+'/digit_model.h5')
framerate = cap.get(cv2.CAP_PROP_FPS)






@app.route('/time',methods=['POST'])
def process_video():

    timefromfe=request.data.decode('UTF-8')

    currentframe=convert2(timefromfe)*framerate


    cap.set(cv2.CAP_PROP_POS_FRAMES,currentframe)

    success, frame = cap.read()
    if success == False:
        print(success)

    original_frame=cv2.imwrite(path+"/images_written/frametest.jpg",frame)   ## save current frame
    read_orig=cv2.imread(path+"/images_written/frametest.jpg")
    time = read_orig[55:80, 930:990]
    colon = time[0:24, 28:32]
    write_colon=cv2.imwrite(path+"/images_written/colon_video.jpg",colon) ## save colon position to predict
    binary_convert_colon(path+"/images_written/colon_video.jpg")
    read_bw_colon = cv2.imread(path+"/images_written/colon_video.jpg", cv2.IMREAD_GRAYSCALE)
    colon_resized = cv2.resize(read_bw_colon, (28, 28), interpolation=cv2.INTER_LINEAR)
    colon_reshaped = colon_resized.reshape(1, 28, 28, 1)
    predictions = model.predict(colon_reshaped)
    actual_predictions=np.argmax(predictions, axis=1)
    if actual_predictions[0]==1:

        ##Predict first digit in format ##:##
        digit1 = time[0:24, 10:19]
        write_digit1=cv2.imwrite(path+"/images_written/digit1.jpg",digit1)
        read = cv2.imread(path+"/images_written/digit1.jpg",cv2.IMREAD_GRAYSCALE)
        resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
        write_digit1 = cv2.imwrite(path+"/images_written/digit1.jpg", resized)
        binary_convert(path+"/images_written/digit1.jpg")
        center(path+"/images_written/digit1.jpg", "digit1.jpg")
        digit1 = cv2.imread(path+"/images_written/digit1.jpg", cv2.IMREAD_GRAYSCALE)
        digit1 = cv2.resize(digit1, (28, 28), interpolation=cv2.INTER_LINEAR)

        digit1 = digit1.reshape(1, 28, 28, 1)
        predict1 = digit_model.predict(digit1)
        actual_prediction1=np.argmax(predict1, axis=1)

#         #Predict second digit in format ##:##
        digit2 = time[0:24, 19:28]
        write_digit2=cv2.imwrite(path+"/images_written/digit2.jpg",digit2)
        read = cv2.imread(path+"/images_written/digit2.jpg",cv2.IMREAD_GRAYSCALE)
        resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
        write_digit2 = cv2.imwrite(path+"/images_written/digit2.jpg", resized)
        binary_convert(path+"/images_written/digit2.jpg")
        center(path+"/images_written/digit2.jpg", "digit2.jpg")
        digit2 = cv2.imread(path+"/images_written/digit2.jpg", cv2.IMREAD_GRAYSCALE)
        digit2 = cv2.resize(digit2, (28, 28), interpolation=cv2.INTER_LINEAR)

        digit2 = digit2.reshape(1, 28, 28, 1)
        predict2 = digit_model.predict(digit2)
        actual_prediction2=np.argmax(predict2, axis=1)

#         #Predict third digit in format ##:##
        digit3 = time[0:24, 32:40]
        write_digit3=cv2.imwrite(path+"/images_written/digit3.jpg",digit3)
        read = cv2.imread(path+"/images_written/digit3.jpg",cv2.IMREAD_GRAYSCALE)
        resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
        write_digit3 = cv2.imwrite(path+"/images_written/digit3.jpg", resized)
        binary_convert(path+"/images_written/digit3.jpg")
        center(path+"/images_written/digit3.jpg", "digit3.jpg")
        digit3 = cv2.imread(path+"/images_written/digit3.jpg", cv2.IMREAD_GRAYSCALE)
        digit3 = cv2.resize(digit3, (28, 28), interpolation=cv2.INTER_LINEAR)

        digit3 = digit3.reshape(1, 28, 28, 1)
        predict3 = digit_model.predict(digit3)
        actual_prediction3=np.argmax(predict3, axis=1)

#         #Predict fourth digit in format ##:##
        digit4 = time[0:24, 41:50]
        write_digit4=cv2.imwrite(path+"/images_written/digit4.jpg",digit4)
        read = cv2.imread("/Users/alex/Desktop/LLS/src/mat_ui/api/images_written/digit4.jpg",cv2.IMREAD_GRAYSCALE)
        resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
        write_digit4 = cv2.imwrite(path+"/images_written/digit4.jpg", resized)
        binary_convert(path+"/images_written/digit4.jpg")
        center(path+"/images_written/digit4.jpg", "digit4.jpg")
        digit4 = cv2.imread(path+"/images_written/digit4.jpg", cv2.IMREAD_GRAYSCALE)
        digit4 = cv2.resize(digit4, (28, 28), interpolation=cv2.INTER_LINEAR)

        digit4 = digit4.reshape(1, 28, 28, 1)
        predict4 = digit_model.predict(digit4)
        actual_prediction4=np.argmax(predict4, axis=1)
        time_game=str(actual_prediction1[0])+str(actual_prediction2[0])+":"+str(actual_prediction3[0])+str(actual_prediction4[0])


        return {"time":time_game}
    return {"game started": False}


if __name__=='__main__':
    #threading.Thread(target=app.run).start()
    app.run(port=5000) #run app in debug mode on port 5000