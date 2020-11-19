import json
import requests
from types import SimpleNamespace
import datetime as dt
from dateutil import parser
import csv
import os
import sys
import re
import pymongo
from csv import reader

myclient = pymongo.MongoClient("mongodb+srv://admin:kkCjl3lr46GHOAOU@cluster0-njbww.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true")
mydb = myclient["gameData"]
mycol = mydb["winProbBySecs"]

# x = mycol.insert_many(INS_LIST)

with open('preds.csv', 'r') as read_obj:
    # pass the file object to reader() to get the reader object
    csv_reader = reader(read_obj)
    # Iterate over each row in the csv using reader object
    i=0
    for row in csv_reader:
        if i == 0:
            i=14
            continue
        # row variable is a list that represents a row in csv
        d = {}
        d["gameId"] = "104174992730350841"
        d["secs"] = int(row[0])
        d["blue"] = row[2]
        d["red"] = row[1]
        x = mycol.insert(d)
        print(row)
        