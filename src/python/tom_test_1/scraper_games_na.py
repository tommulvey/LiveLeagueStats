import csv
import requests
import time
from datetime import datetime

#####################
# The scraper had to be split because pauses
# that had to be made made the code execute too slowly.
# The scraper as a whole could work if this chunk of code
# was just added to the end of the get_data function
# from scraper_matches but it is too slow because there
# are no real checkpoints besides writing to a CSV.
#
# NOTE:
# There is a specified input that the user must provide
# for the name of the csv file to avoid forgetting to change
# the csv name within the code and in doing so, overwriting
# the file(s) with the games that have already been scraped.
# (Clearly not happened to me, just in case so it does not
# happen to somebody else :D)
#####################

#####################
key = 'RGAPI-6ce98738-f84b-4817-b329-c68d33f67cac'
current_patch = '10.16'
#####################

# # Matches to scrape
# esportsGameId: "104174992730350841"
# esportsMatchId: "104174992730350840"

# esportsGameId: "104174992730350842"
# esportsMatchId: "104174992730350840"

def get_data():

    start = datetime.now()

    #####################
    # Getting the ML Data
    team1_indices = [1] + [8, 9, 10, 11]
    team2_indices = [8, 9, 10, 11]
    player_stats = [9, 10, 11, 41, 45]
    # See raw JSON on the Riot API website or the rest of this project for columns

    with open('data.csv', 'w', newline='', encoding='utf-8') as out_file:
        csv_w = csv.writer(out_file)

        for idx, match in enumerate(['104174992730350841', '5df8a2784dc857bb']):  # Put indices to scrape here
            if idx != 0:
                if idx % 100 == 0:
                    print('\n')
                    #print('Done ', idx, ' out of ', len(matches), 'matches.')
                    print('Time elapsed: ', datetime.now() - start)
                    print('\n')
                    #time.sleep(80)

            match_url = 'https://na1.api.riotgames.com/lol/match/v4/matches/' + str(match) + '?api_key=' + key

            r = requests.get(match_url)
            j = r.json()

            try:
                if j['gameMode'] == 'CLASSIC' and j['gameType'] == 'MATCHED_GAME' and j['gameDuration'] >= 1500 and j['gameVersion'][:5] == current_patch:
                    row = [match] + [j['gameDuration']]
                    row = row + [list(j['teams'][0].values())[i] for i in team1_indices]
                    row = row + [list(j['teams'][1].values())[i] for i in team2_indices]

                    for participant in j['participants']:
                        row = row + [participant['championId']]
                        row = row + [list(participant['stats'].values())[i] for i in player_stats]

                        row = row + [participant['timeline']['role'], participant['timeline']['lane']]

                    csv_w.writerow(row)

            except (KeyError, ConnectionError) as e:
                pass
    #####################


if __name__ == '__main__':
    # csv_name = input('Name of the Csv: ')
    # if csv_name[-4:] != '.csv':
    #     csv_name += '.csv'

    print('Started')
    get_data()
    print('Done\n...')
