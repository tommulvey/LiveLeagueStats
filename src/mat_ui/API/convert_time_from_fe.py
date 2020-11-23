import math

def convert2(time):
    time= time.split(':')
    if len(time) ==3:
        return int(time[0]) * 3600 + int(time[1]) * 60 + float(time[2])
    else:
        return int(time[0]) * 60 + float(time[1])


