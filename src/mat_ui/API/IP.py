import time
from flask import Flask,request
from flask_cors import CORS, cross_origin
import os
import numpy as np
import cv2
import pafy
import math
from flask import jsonify
from bson import json_util, ObjectId
import json
from types import SimpleNamespace
import pymongo
import math
from flask_cors import CORS
import threading


from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten

from keras.utils import to_categorical
import numpy as np
from BW_convert import binary_convert_colon,binary_convert
from keras.models import load_model
from center import center
from convert import convert
from convert_time_from_fe import convert2

path = os.getcwd()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
url= "https://www.youtube.com/watch?v=bXFTmt-Pb2M"
myclient = myclient = pymongo.MongoClient("mongodb+srv://admin:kkCjl3lr46GHOAOU@cluster0-njbww.mongodb.net/gameData?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true")
mydb = myclient["gameData"]

video = pafy.new(url)
mystream = video.getbestvideo()
stream_url = mystream.url
cap = cv2.VideoCapture(stream_url)
print("\n========path="+str(path))
# input()
model = load_model(path+'/colon_model.h5')
digit_model = load_model(path+'/digit_model.h5')
framerate = cap.get(cv2.CAP_PROP_FPS)

def parse_json(data):
    return json.loads(json_util.dumps(data))

# @app.route('/getTimeByVideo/<game_id>/<secs_passed>', methods=['GET'])
# def get_sec_stats(game_id, secs_passed):
#     print('asdsa'); input()
#     return

@app.route('/playerstats/<game_id>/<secs_passed>', methods=['GET'])
def get_sec_stats(game_id, secs_passed):
    # game_id = request.form.get('id')
    # seconds_elapsed = request.form.get('seconds_elapsed')
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    #print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

    res = mycol.find_one({"gameId":str(game_id),"secs_passed":int(secs_passed)})

    return parse_json(res)

@app.route('/playerstats10/<game_id>/<secs_passed>', methods=['GET'])
def get_sec_stats_10s(game_id, secs_passed):
    # game_id = request.form.get('id')
    # seconds_elapsed = request.form.get('seconds_elapsed')
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    #print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

    res = mycol.find( {"gameId":str(game_id), "secs_passed":{ "$gte": 2, "$lte": 100 } } )
    for i in res:
        print(i)
        print("\n")
    return parse_json(res)

@app.route('/playerstats30/<game_id>/<secs_passed>', methods=['GET'])
def get_sec_stats_30s(game_id, secs_passed):
    # game_id = request.form.get('id')
    # seconds_elapsed = request.form.get('seconds_elapsed')
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    #print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

    res = mycol.find( {"gameId":str(game_id),"secs_passed": { "$gte": secs_passed, "$lte": int(secs_passed+30)} } )

    return parse_json(res)

@app.route('/playerstats60/<game_id>/<secs_passed>', methods=['GET'])
def get_sec_stats_60s(game_id, secs_passed):
    # game_id = request.form.get('id')
    # seconds_elapsed = request.form.get('seconds_elapsed')
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    #print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

    res = mycol.find( {"gameId":str(game_id),"secs_passed":{ "$gte": int(secs_passed), "$lte":int(secs_passed+60)} } )

    return parse_json(res)


@app.route('/teamIcon/<id>', methods=['GET'])
def teamIcons(id):
    # take an id, rn just a team id, and get res obj
    mydb = myclient["gameData"]
    mycol = mydb["idToIcon"]

    #print("trying to find icon fo id="+str(id)) 

    res = mycol.find( {"esportsTeamId":str(id)} )

    return parse_json(res)

@app.route('/playerIcon/<id>', methods=['GET'])
def playerIcon(id):
    # take an id, rn just a team id, and get res obj
    mydb = myclient["gameData"]
    mycol = mydb["idToIcon"]

    #print("trying to find icon fo id="+str(id)) 

    res = mycol.find( {"playerId":str(id)} )

    return parse_json(res)

@app.route('/matchMetadata/<id>', methods=['GET'])
def matchMetadata(id):
    # id is esports matchid
    mydb = myclient["gameData"]
    mycol = mydb["participantsByGameId"]

    #print("trying to find metadata fo id="+str(id)) 

    res = mycol.find_one( {"esportsGameId":str(id)} )

    return parse_json(res)

@app.route('/winProb/<gameId>/<secs>', methods=['GET'])
def winProdByGameIdAndSecs(gameId="104174992730350841", secs=0):
    # 104174992730350841 
    mydb = myclient["gameData"]
    mycol = mydb["winProbBySecs"]

    #print("trying to find probs fo id="+str(gameId)) 
    res = mycol.find( {"gameId":str(gameId)} )
    r = []
    for i in res:
        r.append({k: v for k, v in i.items() if k != '_id'})
    #     print(i)
    # print(r)
    r = [x for x in r if x['secs'] <= int(secs) ]
    return jsonify(r)

@app.route('/getLC/<gameId>/<secs>', methods=['GET'])
def lineChartByGameIdAndSecs(gameId="104174992730350841", secs=0):
    # 104174992730350841 
    mydb = myclient["gameData"]
    mycol = mydb["winProbBySecs"]

    #print("trying to find probs fo id="+str(gameId)) 
    res = mycol.find( {"gameId":str(gameId), "secs" : {"$lte": int(secs)}} )
    r = []
    for i in res:
        # r.append({k: v for k, v in i.items() if k != '_id'})
        r.append({'x': int(i['secs']), 'y':float(100-float(i['red'])) })
    #     print(i)
    # print(r)
    # r = [x for x in r if x['secs'] <= int(secs) ]
    return jsonify(r)

import random
from threading import Thread

@app.route('/pieCharts/<gameId>/<secs>', methods=['GET'])
def pieCharts(gameId="104174992730350841", secs=0):
    # 104174992730350841 
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    #print("trying to find probs fo id="+str(gameId)) 
    res = mycol.find_one( {"gameId":str(gameId), "secs_passed" : {"$eq": int(secs)}} )
    # pi charts are 
    # 1) damge share per team
    # 2) total gold earn per team
#    data={[
#     { title: 'One', value: 10, color: '#E38627' },
#     { title: 'Two', value: 15, color: '#C13C37' },
#     { title: 'Three', value: 20, color: '#6A2135' },
#   ]}
    T1_DMG = []#1
    T2_DMG = []#2
    T1_GLD = []#3
    T2_GLD = []#4
    T1_KLS = [] #kills #5
    T2_KLS = []#6
    T1_DTS = [] #deaths #7
    T2_DTS = []#8
    T1_CS = [] #creepScore #9
    T2_CS = []#10
    T1_WP = []#11
    T2_WP = [] #wardsPlaced #12
    T1_WD = [] #wardsDestroyed #13
    T2_WD = []
    yocolors = {
        0: "#003366",
        1: "#3366cc",
        2: "#00ffcc",
        3: "#000066",
        4: "#33cccc",
        5: "#660066",
        6: "#993366",
        7: "#9900ff",
        8: "#990033",
        9: "#cc99ff"
    }
    players = res['participants']
    i = 0
    r = lambda: random.randint(0,255)
    for p in players:
        if i < 5: 
            T1_DMG.append({'participantId':p['participantId'], 'y':p['championDamageShare'], 'color':yocolors[i] })
            T1_GLD.append({'participantId':p['participantId'], 'y':p['totalGoldEarned'], 'color':yocolors[i] })
            T1_KLS.append({'participantId':p['participantId'], 'y':p['kills'], 'color':yocolors[i] })
            T1_CS.append({'participantId':p['participantId'], 'y':p['creepScore'], 'color':yocolors[i] })
            T1_DTS.append({'participantId':p['participantId'], 'y':p['deaths'], 'color':yocolors[i] })
            T1_WP.append({'participantId':p['participantId'], 'y':p['wardsPlaced'], 'color':yocolors[i] })
            T1_WD.append({'participantId':p['participantId'], 'y':p['wardsDestroyed'], 'color':yocolors[i] })
        else:
            T2_DMG.append({'participantId':p['participantId'], 'y':p['championDamageShare'], 'color':yocolors[i] })
            T2_GLD.append({'participantId':p['participantId'], 'y':p['totalGoldEarned'], 'color':yocolors[i] })
            T2_KLS.append({'participantId':p['participantId'], 'y':p['kills'], 'color':yocolors[i] })
            T2_CS.append({'participantId':p['participantId'], 'y':p['creepScore'], 'color':yocolors[i] })
            T2_DTS.append({'participantId':p['participantId'], 'y':p['deaths'], 'color':yocolors[i] })
            T2_WP.append({'participantId':p['participantId'], 'y':p['wardsPlaced'], 'color':yocolors[i] })
            T2_WD.append({'participantId':p['participantId'], 'y':p['wardsDestroyed'], 'color':yocolors[i] })
        i = i + 1

    r = [T1_DMG, T2_DMG,T1_GLD, T2_GLD,T1_KLS,T2_KLS,T1_DTS,T2_DTS,T1_CS,T2_CS,T1_WP,T2_WP,T1_WD,T2_WD]
    return jsonify(r)


def kFormatter(num) :
    if num < 1000 : 
        return str(num)
        # change to 2.5k or some shit later, not 2.441
    return str((num/1000))+'k'

@app.route('/prettyPlayerStats/<gameId>/<secs>', methods=['GET'])
def prettyPlayerStats(gameId="104174992730350841", secs=0):
    # 104174992730350841 
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    # { p1: kda, gold}

    if int(secs) < 0:
        # return a mocked shit
        r=[]
        for p in range(1,11):
            r.append({'playerId': p, 'kda':'--', 'gold': '--' })
        return jsonify(r)

    #print("trying to find probs fo id="+str(gameId)) 
    res = mycol.find_one( {"gameId":str(gameId), "secs_passed" : {"$eq": int(secs)}} )
    # pi charts are 
    # 1) damge share per team
    # 2) total gold earn per team
#    data={[
#     { title: 'One', value: 10, color: '#E38627' },
#     { title: 'Two', value: 15, color: '#C13C37' },
#     { title: 'Three', value: 20, color: '#6A2135' },
#   ]}
    r = []

    try: 
        players = res['participants']
        for p in players: #"{:.2f}".format
            kda = "{:.2f}".format((int(p['kills'])+int(p['assists']))/int(p['deaths'])) if int(p['deaths']) is not 0 else "{:.2f}".format((int(p['kills'])+int(p['assists']))/(int(p['deaths'])+1))
            r.append({'playerId':p['participantId'], 'kda':kda, 'gold': kFormatter(p['totalGoldEarned']) })

        return jsonify(r)
    except:
        r=[]
        for p in range(1,11):
            r.append({'playerId': p, 'kda':'--', 'gold': '--' })
        return jsonify(r)

def normie(a,b):
    if a==0 and b==0:
        return 0,0
    else:
        return a/(a+b), b/(a+b)

@app.route('/barGraphs/<gameId>/<secs>', methods=['GET'])
def barChartByGameIdAndSecs(gameId="104174992730350841", secs=0):
    # 104174992730350841 
    mydb = myclient["gameData"]
    mycol = mydb["window"]

    # bar 1: total gold between teams
    # bar 2: total kills
    # bar 3: total towers
    # bar 4: total dragons
    # schea ret : [(blue, red), (....)]
    res = mycol.find_one( {"gameId":str(gameId), "secs_passed" : {"$eq": int(secs)}} )
    r = []
    # for i in res:
    #     a = ()
    #     r.append({'x': int(i['secs']), 'y':float(100-float(i['red'])) })
    try: 
        # print(res)
        # input()
        r = {}
        blue_team = res['blueTeam']
        red_team = res['redTeam']
        # print(blue_team)
        
        
        # for p in players: #"{:.2f}".format
        #     kda = "{:.2f}".format((int(p['kills'])+int(p['assists']))/int(p['deaths'])) if int(p['deaths']) is not 0 else "{:.2f}".format((int(p['kills'])+int(p['assists']))/(int(p['deaths'])+1))
        #     r.append({'playerId':p['participantId'], 'kda':kda, 'gold': kFormatter(p['totalGoldEarned']) })

        # r.append((blue_team['totalGold'], red_team['totalGold']))
        # r.append((blue_team['totalKills'], red_team['totalKills']))
        # r.append((blue_team['towers'], red_team['towers']))
        # r.append((len(blue_team['dragons']), len(red_team['dragons'])))

        bg,rg = normie(float(blue_team['totalGold']), float(red_team['totalGold']))
        bk,rk = normie(float(blue_team['totalKills']), float(red_team['totalKills']))
        bt,rt = normie(float(blue_team['towers']), float(red_team['towers']))
        bd,rd = normie(len(blue_team['dragons']), float(len(red_team['dragons'])))

        r['blue'] = [bg, bk, bt, bd]
        r['red'] = [rg, rk, rt, rd]

        return jsonify(r)
    except:
        print("except")
        r={
            'red':[0,0,0,0],
            'blue' :[0,0,0,0]
        }
        return jsonify(r)

actual_prediction = [0,0,0,0]

def f1():
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

    actual_prediction[0] = actual_prediction1

    return

def f2():
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

    actual_prediction[1] = actual_prediction2

    return

def f3():
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

    actual_prediction[2] = actual_prediction3

    return

def f4():
    digit4 = time[0:24, 41:50]
    write_digit4=cv2.imwrite(path+"/images_written/digit4.jpg",digit4)
    read = cv2.imread(path+"/images_written/digit4.jpg",cv2.IMREAD_GRAYSCALE)
    resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
    write_digit4 = cv2.imwrite(path+"/images_written/digit4.jpg", resized)
    binary_convert(path+"/images_written/digit4.jpg")
    center(path+"/images_written/digit4.jpg", "digit4.jpg")
    digit4 = cv2.imread(path+"/images_written/digit4.jpg", cv2.IMREAD_GRAYSCALE)
    digit4 = cv2.resize(digit4, (28, 28), interpolation=cv2.INTER_LINEAR)

    digit4 = digit4.reshape(1, 28, 28, 1)
    predict4 = digit_model.predict(digit4)
    actual_prediction4=np.argmax(predict4, axis=1)

    actual_prediction[3] = actual_prediction4

    return

@app.route('/time',methods=['POST'])
def process_video():
    # print("fuck");input()

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
        t1 = Thread(target=f1)
        t2 = Thread(target=f2)
        t3 = Thread(target=f3)
        t4 = Thread(target=f4)

        t1.start()
        t2.start()
        t3.start()
        t4.start()


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
        read = cv2.imread(path+"/images_written/digit4.jpg",cv2.IMREAD_GRAYSCALE)
        resized = cv2.resize(read, (28, 28), interpolation=cv2.INTER_LINEAR)
        write_digit4 = cv2.imwrite(path+"/images_written/digit4.jpg", resized)
        binary_convert(path+"/images_written/digit4.jpg")
        center(path+"/images_written/digit4.jpg", "digit4.jpg")
        digit4 = cv2.imread(path+"/images_written/digit4.jpg", cv2.IMREAD_GRAYSCALE)
        digit4 = cv2.resize(digit4, (28, 28), interpolation=cv2.INTER_LINEAR)

        digit4 = digit4.reshape(1, 28, 28, 1)
        predict4 = digit_model.predict(digit4)
        actual_prediction4=np.argmax(predict4, axis=1)

        t1.join()
        t2.join()
        t3.join()
        t4.join()

        time_game=str(actual_prediction1[0])+str(actual_prediction2[0])+":"+str(actual_prediction3[0])+str(actual_prediction4[0])


        return {"time":time_game}
    return {"game started": False}


if __name__=='__main__':
    #threading.Thread(target=app.run).start()
    app.run(port=5000, threaded=True) #run app in debug mode on port 5000
