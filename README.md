# AllTheNewsScrape

_Scrape news and choose to save it or delete it on MongoDB. Add and delete notes to each news._

### To start 📋

_Some of this MongoDB especifications might not work in your computer depending on your MongoDB install process. Try to skip step 1 if it didn't work. _

_1.- Run MongoDB _
```
mongod
```
_2.- Open a new console and start MongoDB on the repository file_
```
mongo
```
_3.- Go to the repository file and install all npm dependencies_
```
npm install
```
_4.- Start the aplication_
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

 ## Heroku Deployed version ✒️

* Wait for it!

---
⌨️ [DulcineaPena1](https://github.com/dulcineapena1) 😊

