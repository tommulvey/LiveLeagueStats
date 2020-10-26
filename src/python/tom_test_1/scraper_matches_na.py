import csv
import numpy as np
import requests
import time
from datetime import datetime


#####################
# RIOT API SCRAPER
# Used for scraping certain statistics from League of
# Legends games.
#
# NOTE:
# There is a 20 per second, 100 per 2 minutes request
# limit on the requests so that is the reason for sleeping
# every now and then.It might also happen that
# a computer manages to push that 20 per second limit
# and that is the reason for "try, except" catches (I assume
# but I am not certain, the code just fails to get a request
# from time to time but works fine most of the time).
#####################

#####################
key = 'api-key'

more_players_threshold = 2000  # Threshold put up in order to avoid request timeout
csv_name = 'matches_na.csv'
#####################


def get_data():

    start = datetime.now()

    #####################
    # Getting random Summoner names from featured Games

    random_game_url = 'https://na1.api.riotgames.com/lol/spectator/v4/featured-games?api_key=' + key
    initial_summoner_names = []

    r = requests.get(random_game_url)
    j = r.json()

    for game in j['gameList']:
        for player in game['participants']:
            if player['bot'] == False and player['summonerName'] not in initial_summoner_names:
                initial_summoner_names.append(player['summonerName'])
    #####################

    print('\n')
    print('Got initial matches.')
    print('Time elapsed: ', datetime.now() - start)
    print('\n')

    #####################
    # Getting the Acount and Summoner ID based on Summoner names
    summoners = np.empty((0, 3))
    # Columns: Summoner Name, ID, Accont ID

    for name in initial_summoner_names[:49]:

        summoner_url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + \
            name + '?api_key=' + key

        r = requests.get(summoner_url)
        j = r.json()

        row = np.array([[name, j['id'], j['accountId']]])
        summoners = np.append(summoners, row, axis=0)
    #####################

    print('\n')
    print('Got initial summoners.')
    print('Time elapsed: ', datetime.now() - start)
    print('\n')

    #####################
    # Getting Match IDs for previous 100 matches for summoners we currently have
    matches = []

    for accid in summoners[:, 2]:

        acc_url = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + \
            accid + '?api_key=' + key

        r = requests.get(acc_url)
        j = r.json()

        try:
            for game in j['matches']:
                if game['gameId'] not in matches:
                    matches.append(game['gameId'])
        except KeyError:
            print(j)
    #####################

    time.sleep(120)
    print('\n')
    print('Started getting the rest of the Summoners.')
    print('Time elapsed: ', datetime.now() - start)
    print('\n')

    #####################
    # Getting more Players from matches we currently have to Get more Matches

    for idx, match in enumerate(matches[:more_players_threshold]):
        if idx != 0:
            if idx % 100 == 0:
                print('\n')
                print('Done ', idx, ' out of ',
                      len(matches[:more_players_threshold]), ' matches.')
                print('Time elapsed: ', datetime.now() - start)
                print('\n')
                time.sleep(120)

        match_url = 'https://na1.api.riotgames.com/lol/match/v4/matches/' + \
            str(match) + '?api_key=' + key

        r = requests.get(match_url)
        j = r.json()

        try:
            for participant in j['participantIdentities']:
                player_info = participant['player']

                row = np.array(
                    [[player_info['summonerName'], player_info['summonerId'], player_info['accountId']]])
                if row not in summoners:
                    summoners = np.append(summoners, row, axis=0)
        except (KeyError, ConnectionError) as e:
            time.sleep(1)
    #####################

    print('\n')
    print('# of obtained summoners: ', summoners.shape[0])
    print('Time elapsed: ', datetime.now() - start)
    print('\n')
    time.sleep(120)

    #####################
    # Getting the rest of the Matches

    with open(csv_name, 'w', newline='', encoding='utf-8') as out_file:
        csv_w = csv.writer(out_file)
        # CSV for checkpoint

        for idx, accid in enumerate(summoners[49:, 2]):
            if idx != 0:
                if idx % 100 == 0:
                    print('\n')
                    print('Done ', idx, ' out of ',
                          len(summoners[49:, 2]), ' summoners.')
                    print('Time elapsed: ', datetime.now() - start)
                    print('\n')
                    time.sleep(120)

            acc_url = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + \
                accid + '?api_key=' + key

            r = requests.get(acc_url)
            j = r.json()

            try:
                for game in j['matches']:
                    if game['gameId'] not in matches:
                        matches.append(game['gameId'])

                        csv_w.writerow([game['gameId']])
            except (KeyError, ConnectionError) as e:
                time.sleep(1)
    #####################

    print('\n')
    print('# of matches:', len(matches))
    print('Time elapsed: ', datetime.now() - start)
    print('Done')
    input('...')


if __name__ == '__main__':
    get_data()
