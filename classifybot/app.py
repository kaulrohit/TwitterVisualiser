from flask import Flask, render_template, request, send_file, redirect, url_for
app = Flask(__name__)
import os, glob, random, shutil, hashlib, sqlite3, enum

imagepath = "/home/ubuntu/images/"

class Crimes(enum.Enum):
	NoCrime = 0
	Assault = 1
	Murder = 2
	Theft = 3
	Kidnap = 4
	Scene = 5
	Other = 99

@app.route("/index")
def view():
	#return "<img src='" + randomImage + "'>"
	sha256 = hashlib.sha256()
	x = randomImage()
	with open(x, 'rb', buffering=0) as readhash:
		sha256.update(readhash.read())
	path = imagepath + "/unprocessed/" + sha256.hexdigest() + os.path.splitext(x)[-1]
	os.rename(x, path)
	return render_template('view.html', folder="unprocessed", file=path, filename=sha256.hexdigest() + os.path.splitext(x)[-1], crime=Crimes, path="submit")

@app.route("/edit/<path:path>", methods=['GET'])
def edit(path):
	filepath = imagepath + "/classifyBot/" + path
	return render_template('view.html', folder="classifyBot", file=filepath, filename=path, crime=Crimes, path="edit")

def randomImage():
	ext = [ "jpg", "jpeg", "png", "bmp", "gif" ]
	file = []
	for e in ext:
			file.extend(glob.glob(imagepath + "/unprocessed" + ("/**/*." + e), recursive=True))
	return os.path.relpath(random.choice(file), app.root_path)

@app.route("/submit", methods=['POST'])
def submit():
	if request.method == "POST":
		try:
			shutil.move( imagepath + "unprocessed/" + request.form['path'], imagepath + "/classifyBot/")
		except Exception as e:
			print("copy failed")
			print(e)
		conn = sqlite3.connect('imageClassified.db', timeout=10)
		c = conn.cursor()
		c.execute("INSERT INTO images VALUES (?, ?, ?)", (request.form['path'], request.form['crimeType'], request.form['caption']))
		conn.commit()
		conn.close()
	return redirect('/index')

@app.route("/edit", methods=['POST'])
def editReq():
	if request.method == "POST":
		conn = sqlite3.connect('imageClassified.db', timeout=10)
		c = conn.cursor()
		c.execute("UPDATE images SET crimeType=?, caption=? WHERE filename=?", (request.form['crimeType'], request.form['caption'], request.form['path']))
		conn.commit()
		conn.close()
	return redirect('/stats')

@app.route("/stats")
def stats():
	conn = sqlite3.connect('imageClassified.db', timeout=10)
	conn.row_factory = row_factory
	c = conn.cursor()
	#c.execute("UPDATE images SET crimeType=?, caption=? WHERE filename=?", (request.form['crimeType'], request.form['caption'], request.form['path']))
	c.execute("select * from images")#[::-1][:50]
	images = c.fetchall()
	c.execute("select crimeType, count(*) from images group by crimeType")
	stats = c.fetchall()
	conn.close()

#	import pdb; pdb.set_trace()
	images = images[::-1][:50]
	for i in stats:
		i[0] = int(i[0])
	for i in images:
		i[1] = int(i[1])
#	for i in range(0, len(images)):
#		for image in images[i:i + 5]:
#			print(image)
	#import pdb; pdb.set_trace()
	return render_template('stats.html', images=images, stats=stats, crime=Crimes)


@app.route("/images/<path:path>")
def sendfile(path):
	print(path)
	return send_file(imagepath + path)

def row_factory(cursor, row):
	d = []
	for idx, col in enumerate(cursor.description):
		d.append(row[idx])
	return d
