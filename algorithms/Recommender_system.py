import pymongo
import MongoClient 
cluster = pymongo.MongoClient("mongodb+srv://test:ajaysanjay1@cluster0.lvyjc.mongodb.net/Project0?retryWrites=true&w=majority")

mydb = cluster["Get-Linked"]
mycol = mydb["links"]

for x in mycol.find({},):
  print(x)
