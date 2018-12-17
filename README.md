# AllTheNewsScrape

_Scrape news and choose to save it or delete it on MongoDB. Add and delete notes to each news._

### To start 📋

_You should have installed MongoDB and optional RoboMongo_

_1.- Change the database name on server.js file in line 45, to create your own_
```
mongodb://localhost/<namehere>
```
_2.- Go to the repository file and install all npm dependencies_
```
npm install
```
_3.- Run MongoDB_
```
mongod
```
_4.- Open a new console and start MongoDB on the repository file_
```
mongo
```
_5.- Start the aplication_
```
node server.js
```

_Important: [the scraped site](https://medium.com/topic/popular) change their section classes each two or three days, so if is not working, you should change the line 81 on server.js file to match with the actual site section label. [Change it here](/server.js) _

## Functionalities🛠️

* Scrape articles from a site (I choose Medium.com)
* Save articles on MongoDB
* Delete articles on MongoDB
* Populate articles with notes
* Delete notes
* See the notes on each article

## Built with🛠️

* Javascript/Jquery
* Handlebars templating
* Node.js
* Express.js
* MongoDB
* Mongoose

_Aditional dependencies_
* Axios (to do the http request / this is similar to ajax from jquery)
* Cheerio (get the html from a site in json format)

 ## Heroku Deployed version ✒️

* [Heroku version](https://aqueous-taiga-96072.herokuapp.com/)

---
⌨️ [DulcineaPena1](https://github.com/dulcineapena1) 😊

