import mwclient
import urllib.request
import json
import re

def get_filename_url_to_open(site, filename, player, size=None):
    pattern = r'.*src\=\"(.+?)\".*'
    size = '|' + str(size) + 'px' if size else ''
    to_parse_text = '[[File:{}|link=%s]]'.format(filename, size)
    result = site.api('parse', title='Main Page',
                      text=to_parse_text, disablelimitreport=1)
    parse_result_text = result['parse']['text']['*']

    url = re.match(pattern, parse_result_text)[1]
    #In case you would like to save the image in a specific location, you can add the path after 'url,' in the line below.
    urllib.request.urlretrieve(url, player + '.png')


player = "Perkz"

site = mwclient.Site('lol.gamepedia.com', path='/')
response = site.api('cargoquery',
                    limit=1,
                    tables="PlayerImages",
                    fields="FileName",
                    where='Link="%s"' % player,
                    format="json"
                    )
parsed = json.dumps(response)
decoded = json.loads(parsed)
url = str(decoded['cargoquery'][0]['title']['FileName'])
get_filename_url_to_open(site, url, player)