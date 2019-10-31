# VisCrime

> Modern cross-platform application with state of the art data visualisation

## What is VisCrime?

VisCrime is essentially an application which allows its users to view *crime* data pulled from Twitter.
This data is collected and filtered via a *Natural Language Processing (NLP)* system, which is used for *Data Visualisation*,
*Tweet Searches* and also *Trajectory mappings*.

Basic features include:
- A cross-platform mobile application built using *React-Native*.
- Real-time crime data processing in the backend server.
  - Using NLP and other techniques.
- Trajectory model based on accurate data sets.
- Meaningful data visualisation.

## Getting Started

The system uses `nodejs` for the backend.
> You will need to download `npm@4` or below. *Might have to downgrade NPM post-install.*

Installing `nodejs` on Windows using Chocolatey and OSX using Brew.
```powershell
# For Windows setup
choco install nodejs -y

# For OSX setup
brew install node
```

The system also uses `pip` to manage python package packages

If you installed python from python.org you should have pip by default if not,
see https://pip.pypa.io/en/stable/installing/ for an installation guide.


Once you have both nodejs and pip, you can install the required packages for the project by doing the following:

For node packages, run this in the directory with package.json: 
```
npm install 
```

For python packages, run this in the `backend` directory:

```
pip install -r requirements.txt
```

Or if you are on windows:

```
pip install -r requirements_windows.txt
```

Also note that if you wish to run the AWS rekognition processing script you''ll need to run the following in the `scripts` directory

```
pip install -r rekognition-requirement.txt
```

## Running the application

To run the application you must set up the a `variables.env` file in the backend directory, simply create the file and ensure the following 
variables are configured:

TWITTER_CONSUMER_KEY=xxxx
TWITTER_CONSUMER_SECRET=xxxx
TWITTER_ACCESS_TOKEN_KEY=xxxx
TWITTER_ACCESS_TOKEN_SECRET=xxx
WORDSAPIKEY=xxxx
GOOGLE_PLACES_API=xxxx
CHICAGO_TOKEN=xxxx
CHICAGO_SECRET=xxxx
IMAGE_DATABASE_LOCATION=mongodb://xxxx:xxxx@xxxx:xxxx/viscrime
MELBOURNE_DATABASE_LOCATION=mongodb://team:swinburne@136.186.108.40/tweets
CHICAGO_DATABASE_LOCATION=mongodb://team:swinburne@136.186.108.40/tweetsChicago
CHICAGO_CRIME_DATABASE_LOCATION=mongodb://team:swinburne@136.186.108.40/chicagoCrime

To now run the application we can simply do an `npm start` command in the backend folder and it will fire up locally on port `3000`.

## Testing (Cypress)

To run cypress, simply navigate to the `backend` directory and run: 
`./start-cypress.sh`
This script will open the cypress test window where you can choose what tests to run.

### Creating Tests (Integration Tests)

To create cypress tests navigate to `backend/cypress` directory and see all the examples in the `integration` folder.
Here you can create integration tests that will be visible when you run the `./start-cypress.sh` script.

## Using local databases

Instead of running the application with the production databases used to hold tweets and crimes, it may help to have your own local copy of the files so that you can do whatever you like to them. To do this, first set up different MongoDB databases for each of the Melbourne, Chicago and Chicago Crime databases, which can be accessed by typing into your command line (with Mongo installed) "mongo " and then one of the following:

- mongodb://team:swinburne@43.240.97.166/tweets
- mongodb://team:swinburne@43.240.97.166/tweetsChicago
- mongodb://team:swinburne@43.240.97.166/chicagoCrime

From here you can access the databases using the command line. To copy these to your database, use
`mongodump --uri="mongodb://mongodb0.example.com:27017"` from your PC (not the mongo shell), where the string is one of the above mongoDB locations. This will generate a dump file for you, which you can then use with the `mongorestore` command to add to your local database. From there, get the credentials for your databases and add them to the `variables.env` file in the backend. You won't be able to add the exact sane images database that we use on production since you'd need the same images, however you can run our own image database provided you set it up with the same schema. There is a mongo database dump for the viscrime db in the `dbdumps` directory.