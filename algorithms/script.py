import pymongo


import json
data_list=[]
data = {}
myclient = pymongo.MongoClient("mongodb+srv://test:ajaysanjay1@cluster0.lvyjc.mongodb.net/getlinked?retryWrites=true&w=majority")
mydb = myclient["Get-Linked"]
mycol = mydb["temp"]

for x in mycol.find({},):
  print(x)
