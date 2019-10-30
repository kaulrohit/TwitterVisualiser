from pymongo import MongoClient
import boto3, os, json, sys, hashlib, enum

# VARIABLES
MONGO_URI = "localhost:27017"
MONGO_COLLECTION = "rekognition"
AWS_KEY_ID = ""
AWS_ACCESS_KEY = ""
AWS_REGION = "ap-southeast-2"
IMAGE_PATH = "/path/to/storage/"
IMAGE_OUTPUT_PATH = "/path/to/output/"

class Crimes(enum.Flag):
	NoCrime =           0b0000000001
	Assault =           0b0000000010
	Theft =             0b0000000100
	Gun =               0b0000001000
	Drugs =             0b0000010000
	PropertyDamage =    0b0000100000
	Homicide =          0b0001000000
	Vehicular =         0b0010000000
	SexOffence =        0b0100000000
	Hostage =           0b1000000000

def getCrime(flag):
	return [crime.name for crime in Crimes.__members__.values() if flag & crime.value]

def getSha(file):
	with open(file,"rb") as f:
		bytes = f.read()
		readable_hash = hashlib.sha256(bytes).hexdigest();
		return(readable_hash)

def connect_to_db(url):
	client = MongoClient(url)
	db = client.rekognition
	return db

if __name__ == "__main__":
	directory = str(IMAGE_PATH)
	db_conn = connect_to_db(MONGO_URI)

	for file in os.listdir(directory):
		filename = os.fsdecode(file)
		if filename.endswith(".jpg") or filename.endswith(".png"):
			imageFile=str(os.path.join(directory, filename))
			sha256 = getSha(imageFile)
			newFilename = "{}{}".format(sha256, os.path.splitext(filename)[1])
			client=boto3.client(
				'rekognition',
				aws_access_key_id=AWS_KEY_ID,
				aws_secret_access_key=AWS_ACCESS_KEY,
				region_name = AWS_REGION)
			try:
				with open(imageFile, 'rb') as image:
					response = client.detect_labels(Image={'Bytes': image.read()})

				img_obj = {
					"image_id": newFilename,
					"lables_with_confidence": {},
					"manualAnnotation": getCrime(int(filename.split(".")[0]))
				}

				for label in response['Labels']:
					img_obj["lables_with_confidence"][label['Name']] = label['Confidence']

				print(img_obj)
				result=db_conn[MONGO_COLLECTION].insert(img_obj)
				# move tagged to new folder
				os.rename(imageFile, os.path.join(IMAGE_OUTPUT_PATH, newFilename))

			except:
				print("Error occured with file: " + filename)
				import traceback
				traceback.print_exc()