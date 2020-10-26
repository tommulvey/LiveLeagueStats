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

s2='2020-09-06T20:09:20.000Z'
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
    with open('final.csv', mode='w') as writer:
        writer = csv.writer(writer, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(COLS)
        url = URL + s2
        res = requests.get(url).text
        x = json.loads(res, object_hook=lambda d: SimpleNamespace(**d))
        state = 'in_game'
        while(state != 'finished'):
            blue = x.frames[0].blueTeam
            red = x.frames[0].redTeam

            if(FD is False):
                if(len(blue.dragons) == 0 and len(red.dragons) > 0 ):
                    Blue_FirstDragon=0; FD=True
                elif (len(blue.dragons) > 0 and len(red.dragons) == 0 ):
                    Blue_FirstDragon=1; FD=True
                else:
                    FD=False
            
            if(FT is False):
                if(int(blue.towers) == 0 and int(red.towers) > 0 ):
                    Blue_FirstTower=0; FT=True
                elif (int(blue.towers) > 0 and int(red.towers) == 0 ):
                    Blue_FirstTower=1; FT=True
                else:
                    FT=False

            if(FI is False):
                if(int(blue.inhibitors) == 0 and int(red.inhibitors) > 0 ):
                    Blue_FirstInhib=0; Purp_FirstInhib=1; FI=True
                elif (int(blue.inhibitors) > 0 and int(red.inhibitors) == 0 ):
                    Blue_FirstInhib=1; Purp_FirstInhib=1; FI=True
                else:
                    FI=False
            print("RED TEAM\n" + str(x.frames[0].redTeam))
            print("\nBLUE TEAM\n" + str(x.frames[0].blueTeam))
            print('===next')
            
            Blue_KillsTower = int(blue.towers)
            Purp_KillsTower = int(red.towers)
            Blue_KillsInhib = int(blue.inhibitors)
            Purp_KillsInhib = int(red.inhibitors)
            Blue_KillsBaron = int(blue.barons)
            Purp_KillsBaron = int(red.barons)
            blue_kills = int(blue.totalKills)
            red_kills = int(red.totalKills)
            Blue_TtlGold = float(blue.totalGold)
            Purp_TtlGold = float(red.totalGold)
            Diff_KillsTower = int(blue.towers) - int(red.towers)
            Diff_KillsInhib = int(blue.inhibitors) - int(red.inhibitors)
            Diff_TtlGold = float(blue.totalGold) - float(red.totalGold)

            Blue_KDAratio, Purp_KDAratio = getKDA(blue_kills, red_kills)
            writer.writerow([Seconds_Elapsed,Blue_FirstTower,Blue_FirstInhib,Blue_FirstDragon \
                            ,Blue_FirstHerald,Blue_KillsTower,Blue_KillsInhib,Blue_KillsBaron \
                            ,Purp_FirstInhib,Purp_FirstHerald,Purp_KillsTower,Purp_KillsInhib \
                            ,Purp_KillsBaron,Blue_KDAratio,Blue_TtlGold,Purp_KDAratio \
                            ,Purp_TtlGold,Diff_KillsTower,Diff_KillsInhib,Diff_TtlGold])

            s = increment(s)
            url = URL + s
            res = requests.get(url).text
            x = json.loads(res, object_hook=lambda d: SimpleNamespace(**d))
            Seconds_Elapsed += 10
            state = x.frames[-1].gameState
    return

# ---
main()