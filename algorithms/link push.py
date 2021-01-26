import pymongo
# from googleapiclient.discovery import build

import json
data_list=[]
data = {}
myclient = pymongo.MongoClient("mongodb+srv://test:ajaysanjay1@cluster0.lvyjc.mongodb.net/getlinked?retryWrites=true&w=majority")
mydb = myclient["Get-Linked"]
mycol = mydb["temp"]

for x in mycol.find({},):
  print(x)

# youtube = build('youtube', 'v3', developerKey='AIzaSyBiGgd_JYUVD9ekuo2o1lXs_bhiU70q1IY')

# res = youtube.playlistItems().list(playlistId='PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO',part='snippet',maxResults=50).execute()
# for i in range(50):
#     links='https://www.youtube.com/watch?v='+res['items'][i]['snippet']['resourceId']['videoId']
#     print(links)
#     data['Link']=links
#     data['Topic']=res['items'][i]['snippet']['title']+" -- Neso Academy"
#     data['_id']=i+77
#     data['Desctiprion']=res['items'][i]['snippet']['description']
#     data['LinkType']="Youtube Video"
#     data['Department']="ECE"
#     data['SubjectName']="Signals and Systems"
#     # print(data_)
#     x = mycol.insert_one(data)
    


