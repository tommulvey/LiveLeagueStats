
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