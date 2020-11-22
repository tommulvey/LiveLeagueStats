# mongo.py

from flask import Flask
from flask import jsonify
from flask import request
from bson import json_util, ObjectId
import json
from types import SimpleNamespace
import pymongo
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
myclient = myclient = pymongo.MongoClient("mongodb+srv://admin:kkCjl3lr46GHOAOU@cluster0-njbww.mongodb.net/gameData?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true")
mydb = myclient["gameData"]

def parse_json(data):
    return json.loads(json_util.dumps(data))

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
    T1_DMG = []
    T2_DMG = []
    T1_GLD = []
    T2_GLD = []
    T1_KLS = [] #kills 
    T2_KLS = []
    T1_DTS = [] #deaths 
    T2_DTS = []
    T1_CS = [] #creepScore
    T2_CS = []
    T1_WP = []
    T2_WP = [] #wardsPlaced 
    T1_WD = [] #wardsDestroyed
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
            T1_DMG.append({'title':p['participantId'], 'value':p['championDamageShare'], 'color':yocolors[i] })
            T1_GLD.append({'title':p['participantId'], 'value':p['totalGoldEarned'], 'color':yocolors[i] })
            T1_KLS.append({'title':p['participantId'], 'value':p['kills'], 'color':yocolors[i] })
            T1_CS.append({'title':p['participantId'], 'value':p['creepScore'], 'color':yocolors[i] })
            T1_DTS.append({'title':p['participantId'], 'value':p['deaths'], 'color':yocolors[i] })
            T1_WP.append({'title':p['participantId'], 'value':p['wardsPlaced'], 'color':yocolors[i] })
            T1_WD.append({'title':p['participantId'], 'value':p['wardsDestroyed'], 'color':yocolors[i] })
        else:
            T2_DMG.append({'title':p['participantId'], 'value':p['championDamageShare'], 'color':yocolors[i] })
            T2_GLD.append({'title':p['participantId'], 'value':p['totalGoldEarned'], 'color':yocolors[i] })
            T2_KLS.append({'title':p['participantId'], 'value':p['kills'], 'color':yocolors[i] })
            T2_CS.append({'title':p['participantId'], 'value':p['creepScore'], 'color':yocolors[i] })
            T2_DTS.append({'title':p['participantId'], 'value':p['deaths'], 'color':yocolors[i] })
            T2_WP.append({'title':p['participantId'], 'value':p['wardsPlaced'], 'color':yocolors[i] })
            T2_WD.append({'title':p['participantId'], 'value':p['wardsDestroyed'], 'color':yocolors[i] })
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
        blue_team = res['blueTeam']
        red_team = res['redTeam']
        print(blue_team)
        
        
        # for p in players: #"{:.2f}".format
        #     kda = "{:.2f}".format((int(p['kills'])+int(p['assists']))/int(p['deaths'])) if int(p['deaths']) is not 0 else "{:.2f}".format((int(p['kills'])+int(p['assists']))/(int(p['deaths'])+1))
        #     r.append({'playerId':p['participantId'], 'kda':kda, 'gold': kFormatter(p['totalGoldEarned']) })

        r.append((blue_team['totalGold'], red_team['totalGold']))
        r.append((blue_team['totalKills'], red_team['totalKills']))
        r.append((blue_team['towers'], red_team['towers']))
        r.append((len(blue_team['dragons']), len(red_team['dragons'])))
        return jsonify(r)
    except:
        print("excep")
        r=[(0,0), (0,0), (0,0), (0,0)]
        return jsonify(r)

if __name__ == '__main__':
    app.run(debug=True)
