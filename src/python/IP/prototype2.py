import os


import numpy as np
import cv2
import pafy

from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten

from keras.utils import to_categorical
import numpy as np
from BW_convert import binary_convert_colon,binary_convert1,binary_convert2,binary_convert3,binary_convert4
from cutting import cropping1,cropping2,cropping3,cropping4
from keras.models import load_model
from center import center




def gather_testing_data():
    digits,labels=gather_Training_Data("digits2/")
    return digits,labels




def gather_Training_Data(folder):
    digit_folders=[]
    digits=[]
    for subfolder in os.listdir(folder):  #Get a list of folders to sort
        if subfolder=='.DS_Store':
            continue
        digit_folders.append(subfolder)
    digit_folders=sorted(digit_folders)

    for subfolder in digit_folders:                 # Gather training data
        for digit in os.listdir(folder+'/'+subfolder):
            if digit == '.DS_Store':
                continue
            image = cv2.imread(folder+'/'+subfolder+"/"+digit,cv2.IMREAD_GRAYSCALE)
            digits.append(image)


    labels = np.arange(10,dtype="uint8")  # Creates labels for training data
    digit_labels = np.repeat(labels, 85) #repeats labels corresponding to digits and number of digits
    digits= np.asarray(digits)
    return digits,digit_labels

def gather_colon_testing_data():
    colons,labels=gather_colon_training_data("colon_training_3/")
    return colons,labels

def gather_colon_training_data(folder):
    colon_folders=[]
    images=[]
    for subfolder in os.listdir(folder):  # Get a list of folders to sort
        if subfolder == '.DS_Store':
            continue
        colon_folders.append(subfolder)
    colon_folders = sorted(colon_folders)

    for subfolder in colon_folders:  # Gather training data
        for image in os.listdir(folder + '/' + subfolder):
            if image == '.DS_Store':
                continue
            image_read = cv2.imread(folder + '/' + subfolder + "/" + image,cv2.IMREAD_GRAYSCALE)
            images.append(image_read)

    labels = np.arange(2, dtype="uint8")  # Creates labels for training data
    colon_labels = np.repeat(labels, 73111)  # repeats labels corresponding to digits and number of digits
    colons = np.asarray(images)
    return colons, colon_labels

def NN_for_digit():
    X_train,y_train=gather_Training_Data("digits2/")
    X_test, y_test=gather_testing_data()

    X_train = X_train.reshape(10500, 28, 28, 1)
    X_test = X_test.reshape(10500, 28, 28, 1)
    y_train_labeled = to_categorical(y_train)
    y_test_labeled = to_categorical(y_test)

    model = Sequential()

    model.add(Conv2D(64, kernel_size=3, activation='relu', input_shape=(28, 28, 1)))
    model.add(Conv2D(32, kernel_size=3, activation='relu'))
    model.add(Flatten())
    model.add(Dense(10, activation='softmax'))

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    hist = model.fit(X_train, y_train_labeled,validation_data=(X_test,y_test_labeled),epochs=4)
    model.save("digit_model.h5")
    print("Saved model to disk")

def NN_Colon():

    x_train,y_train=gather_colon_training_data("colon_training_3/")
    x_test, y_test=gather_colon_testing_data()

    x_train = x_train.reshape(146222, 28, 28, 1)
    x_test = x_test.reshape(146222, 28, 28, 1)
    y_train_labeled = to_categorical(y_train)
    y_test_labeled = to_categorical(y_test)
    model = Sequential()
    model.add(Conv2D(64, kernel_size=3, activation='relu', input_shape=(28, 28, 1)))
    model.add(Conv2D(32, kernel_size=3, activation='relu'))
    model.add(Flatten())
    model.add(Dense(2, activation='softmax'))

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    hist = model.fit(x_train, y_train_labeled, validation_data=(x_test, y_test_labeled), epochs=4)
    model.save("colon_model.h5")
    print("Saved model to disk")

def check_digit(number):
    if number ==0:
        return 0
    if number == 1:
        return 1
    if number ==2:
        return 2
    if number == 3:
        return 3
    if number ==4:
        return 4
    if number == 5:
        return 5
    if number ==6:
        return 6
    if number == 7:
        return 7
    if number ==8:
        return 8
    if number == 9:
        return 9

def convert(milliseconds):
    seconds = milliseconds // 1000
    milliseconds = milliseconds % 1000
    minutes = 0
    hours = 0
    if seconds >= 60:
        minutes = seconds // 60
        seconds = seconds % 60

    if minutes >= 60:
        hours = minutes // 60
        minutes = minutes % 60
    hours=int(hours)
    minutes=int(minutes)
    seconds=int(seconds)
    milliseconds=int(milliseconds)
    return hours*3600+minutes*60+seconds


def process_video():
    model = load_model('colon_model.h5')
    digit_model = load_model('digit_model.h5')

    video = pafy.new("https://youtu.be/bXFTmt-Pb2M?t=258")
    mystream = video.getbestvideo()
    stream_url = mystream.url
    cap = cv2.VideoCapture(stream_url)

    ###########################################
    framerate = round(cap.get(cv2.CAP_PROP_FPS))
    milliseconds = cap.get(cv2.CAP_PROP_POS_MSEC)
    time_interval = 1
    print("Video Framerate: " + str(framerate))
    frames_read = 0
    count= framerate
    ###########################################
    file_for_tom = open("time.txt", "w+")
    ###########################################
    count_for_digits = 700000
    game_started=False
    while True:
        success, frame = cap.read()
        interval=count%(framerate*time_interval)
        # if cv2.waitKey(1) == 27:
        #     break
        if success == False:
            break
        if (interval==0):
            milliseconds = cap.get(cv2.CAP_PROP_POS_MSEC)


            # show_image = cv2.imshow("image", frame)
            time = frame[55:80, 930:990]

            digit1 = time[0:24, 10:19]
            digit2 = time[0:24, 19:28]
            colon = time[0:24, 28:32]
            digit3 = time[0:24, 32:40]
            digit4 = time[0:24, 41:50]
            # show_digit1 = cv2.imshow("digit1", digit1)
            # show_digit2 = cv2.imshow("digit2", digit2)
            # show_colon = cv2.imshow("colon", colon)
            # show_digit3 = cv2.imshow("digit3", digit3)
            # show_digit4 = cv2.imshow("digit4", digit4)
            write_colon=cv2.imwrite("colon_video.jpg",colon)
            binary_convert_colon("colon_video.jpg")
            digit = cv2.imread("colon.jpg", cv2.IMREAD_GRAYSCALE)
            digit = cv2.resize(digit, (28, 28), interpolation=cv2.INTER_LINEAR)

            digit = digit.reshape(1, 28, 28, 1)
            predictions = model.predict(digit)
            actual_predictions=np.argmax(predictions, axis=1)
            if actual_predictions[0]==1:
                game_started=True

                write_digit1=cv2.imwrite("digit1.jpg",digit1)
                read = cv2.imread("digit1.jpg",cv2.IMREAD_GRAYSCALE)
                resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
                write_digit1 = cv2.imwrite("digit1.jpg", resized)
                binary_convert1("digit1.jpg")
                center("digit1.jpg", "digit1.jpg")
                digit1 = cv2.imread("digit1.jpg", cv2.IMREAD_GRAYSCALE)
                digit1 = cv2.resize(digit1, (28, 28), interpolation=cv2.INTER_LINEAR)

                digit1 = digit1.reshape(1, 28, 28, 1)
                predict1 = digit_model.predict(digit1)
                actual_prediction1=np.argmax(predict1, axis=1)
                # read = cv2.imread("digit1.jpg", cv2.IMREAD_GRAYSCALE)
                # write_to_folder = cv2.imwrite("captured_data/" + str(check_digit(actual_prediction1[0])) + "/digit" + str(count_for_digits) + ".jpg", read)

                count_for_digits=count_for_digits+1

                write_digit2 = cv2.imwrite("digit2.jpg", digit2)
                read = cv2.imread("digit2.jpg", cv2.IMREAD_GRAYSCALE)
                resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
                write_digit2 = cv2.imwrite("digit2.jpg", resized)
                binary_convert2("digit2.jpg")
                center("digit2.jpg","digit2.jpg")
                digit2 = cv2.imread("digit2.jpg", cv2.IMREAD_GRAYSCALE)
                digit2 = cv2.resize(digit2, (28, 28), interpolation=cv2.INTER_LINEAR)

                digit2 = digit2.reshape(1, 28, 28, 1)
                predict2 = digit_model.predict(digit2)
                actual_prediction2 = np.argmax(predict2, axis=1)
                # read = cv2.imread("digit2.jpg", cv2.IMREAD_GRAYSCALE)
                # write_to_folder = cv2.imwrite(
                #     "captured_data/" + str(check_digit(actual_prediction2[0])) + "/digit" + str(count_for_digits) + ".jpg", read)
                count_for_digits= count_for_digits+1

                write_digit3 = cv2.imwrite("digit3.jpg", digit3)
                read = cv2.imread("digit3.jpg", cv2.IMREAD_GRAYSCALE)
                resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
                write_digit3 = cv2.imwrite("digit3.jpg", resized)
                binary_convert3("digit3.jpg")
                center("digit3.jpg","digit3.jpg")
                digit3 = cv2.imread("digit3.jpg", cv2.IMREAD_GRAYSCALE)
                digit3 = cv2.resize(digit3, (28, 28), interpolation=cv2.INTER_LINEAR)

                digit3 = digit3.reshape(1, 28, 28, 1)
                predict3 = digit_model.predict(digit3)
                actual_prediction3 = np.argmax(predict3, axis=1)
                # read = cv2.imread("digit3.jpg", cv2.IMREAD_GRAYSCALE)
                # write_to_folder = cv2.imwrite("captured_data/" + str(check_digit(actual_prediction3[0])) + "/digit" + str(count_for_digits) + ".jpg", read)

                count_for_digits= count_for_digits+1

                write_digit4 = cv2.imwrite("digit4.jpg", digit4)
                read = cv2.imread("digit4.jpg", cv2.IMREAD_GRAYSCALE)
                resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
                write_digit4 = cv2.imwrite("digit4.jpg", resized)
                binary_convert4("digit4.jpg")
                center("digit4.jpg", "digit4.jpg")
                digit4 = cv2.imread("digit4.jpg", cv2.IMREAD_GRAYSCALE)
                digit4 = cv2.resize(digit4, (28, 28), interpolation=cv2.INTER_LINEAR)

                digit4 = digit4.reshape(1, 28, 28, 1)
                predict4 = digit_model.predict(digit4)
                actual_prediction4 = np.argmax(predict4, axis=1)
                # read = cv2.imread("digit4.jpg", cv2.IMREAD_GRAYSCALE)
                # write_to_folder=cv2.imwrite("captured_data/"+str(check_digit(actual_prediction4[0]))+"/digit"+str(count_for_digits)+".jpg",read)
                time_game=str(actual_prediction1[0])+str(actual_prediction2[0])+":"+str(actual_prediction3[0])+str(actual_prediction4[0])
                #print("Timestamp of Video: ", convert(timestamp), ", Time in Game:",time_game)
                file_for_tom.write(str(convert(milliseconds))+" "+time_game+"\n")
                print(convert(milliseconds),time_game)
                count_for_digits= count_for_digits +1
            if game_started==False:
                file_for_tom.write(str(convert(milliseconds))+"\n")
                print(convert(milliseconds))


        count+=1
        frames_read += 1
        key = cv2.waitKey(1)
        if key == ord("e"):
            break
    ###########################################

    print("Frames Processed:", frames_read)
    cap.release()
    cv2.destroyAllWindows()
    ##########################################



def main():
    process_video()

main()

