import json
import requests
from types import SimpleNamespace
import datetime as dt
import csv


COLS = ['Seconds_Elapsed','Blue_FirstTower','Blue_FirstInhib','Blue_FirstDragon' \
    ,'Blue_FirstHerald','Blue_KillsTower','Blue_KillsInhib','Blue_KillsBaron' \
    ,'Purp_FirstInhib','Purp_FirstHerald','Purp_KillsTower','Purp_KillsInhib' \
    ,'Purp_KillsBaron','Blue_KDAratio','Blue_TtlGold','Purp_KDAratio' \
    ,'Purp_TtlGold','Diff_KillsTower','Diff_KillsInhib','Diff_TtlGold']

# if we know the start time we can figure out time elapsed
# https://feed.lolesports.com/livestats/v1/details/104174992730350841?startingTime=2020-09-06T20:09:50.000Z
# https://feed.lolesports.com/livestats/v1/window/104174992730350841?startingTime=2020-09-06T20:09:50.000Z  # we only care bout dis fo now

URL = 'https://feed.lolesports.com/livestats/v1/window/104174992730350841?startingTime='

s2='2020-09-06T20:42:50.000Z'
# START_TIME = str(dt.datetime.strptime(s2, '%Y-%m-%dT%H:%M:%S'))

def dt_to_str(d):
    return str(d.year)+'-'+str(d.month).zfill(2)+'-'+str(d.day).zfill(2)+'T'+str(d.hour).zfill(2)+':'+str(d.minute).zfill(2)+':'+str(d.second).zfill(2)+'.000Z'

def increment(dt_str):
    # take in a datetime, increment by 10 sec and return new string
    # str is '2020-09-06T20:09:50.000Z' so strip off last 5 chars
    # dt_str = dt_str[:-5]
    return dt_to_str(dt.datetime.strptime(dt_str[:-5], '%Y-%m-%dT%H:%M:%S') + dt.timedelta(seconds=10))

# for i in range(5):
#     print(s2)
#     s2 = increment(s2)
HASH = {}

def getKDA(blue_kills, red_kills):
    if blue_kills ==0 and red_kills ==0:
        return 0,0 
    if blue_kills == 0:
        return 0, red_kills/1
    if red_kills == 0:
        return blue_kills/1, 0
    return float(blue_kills/red_kills), float(red_kills/blue_kills)

def main():
    s = s2
    # print(x.gameMetadata.blueTeamMetadata)
    # META DATA EX 
    # for i in x.gameMetadata.blueTeamMetadata.participantMetadata:
    #     print(str(i.role ) + '=> ' + str(i.summonerName) + ' ' + str(i.championId))
    Blue_FirstTower=.5;Blue_FirstInhib=0;Blue_FirstDragon=.5;Blue_FirstHerald=0;Blue_KillsTower=0;Blue_KillsInhib=0;
    Blue_KillsBaron=0;Purp_FirstInhib=0;Purp_FirstHerald=0;Purp_KillsTower=0;
    Purp_KillsInhib=0;Purp_KillsBaron=0;Blue_KDAratio=0;Blue_TtlGold=0;Purp_KDAratio=0;Purp_TtlGold=0;
    Diff_KillsTower=0;Diff_KillsInhib=0;Diff_TtlGold=0;
    Seconds_Elapsed = 0
    FD=False;FT=False;FI=False;FH=False;
    url = URL + s2
    res = requests.get(url).text
    x = json.loads(res, object_hook=lambda d: SimpleNamespace(**d))
    state = 'in_game'
    while(state != 'finished'):
        blue = x.frames[0].blueTeam
        red = x.frames[0].redTeam
        print('TIME : ' + s)
        print('stte : ' + str(x.frames[0].gameState))

        s = increment(s)
        url = URL + s
        res = requests.get(url).text
        x = json.loads(res, object_hook=lambda d: SimpleNamespace(**d))
        Seconds_Elapsed += 10
        state = x.frames[9].gameState
    return

# ---
main()