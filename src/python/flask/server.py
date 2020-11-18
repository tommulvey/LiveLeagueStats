# mongo.py

from flask import Flask
from flask import jsonify
from flask import request
from bson import json_util, ObjectId
import json
import pymongo

app = Flask(__name__)

myclient = pymongo.MongoClient("yoputurihere")
mydb = myclient["gameData"]

def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/playerstats/<game_id>/<secs_passed>', methods=['GET'])
def get_sec_stats(game_id, secs_passed):
    # game_id = request.form.get('id')
    # seconds_elapsed = request.form.get('seconds_elapsed')
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

    res = mycol.find_one({"gameId":str(game_id),"secs_passed":int(secs_passed)})

    return parse_json(res)

@app.route('/playerstats10/<game_id>/<secs_passed>', methods=['GET'])
def get_sec_stats_10s(game_id, secs_passed):
    # game_id = request.form.get('id')
    # seconds_elapsed = request.form.get('seconds_elapsed')
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

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

    print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

    res = mycol.find( {"gameId":str(game_id),"secs_passed": { "$gte": secs_passed, "$lte": int(secs_passed+30)} } )

    return parse_json(res)

@app.route('/playerstats60/<game_id>/<secs_passed>', methods=['GET'])
def get_sec_stats_60s(game_id, secs_passed):
    # game_id = request.form.get('id')
    # seconds_elapsed = request.form.get('seconds_elapsed')
    mydb = myclient["gameData"]
    mycol = mydb["details"]

    print("trying to find id="+str(game_id)+" with sec="+str(secs_passed))

    res = mycol.find( {"gameId":str(game_id),"secs_passed":{ "$gte": int(secs_passed), "$lte":int(secs_passed+60)} } )

    return parse_json(res)


@app.route('/teamIcon/<id>', methods=['GET'])
def teamIcons(id):
    # take an id, rn just a team id, and get res obj
    mydb = myclient["gameData"]
    mycol = mydb["idToIcon"]

    print("trying to find icon fo id="+str(id)) 

    res = mycol.find( {"esportsTeamId":str(id)} )

    return parse_json(res)


@app.route('/matchMetadata/<id>', methods=['GET'])
def matchMetadata(id):
    # id is esports matchid
    mydb = myclient["gameData"]
    mycol = mydb["participantsByGameId"]

    print("trying to find metadata fo id="+str(id)) 

    res = mycol.find_one( {"esportsGameId":str(id)} )

    return parse_json(res)


if __name__ == '__main__':
    app.run(debug=True)
