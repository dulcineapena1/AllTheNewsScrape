var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT ||3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
//Para utilizarlo con Handlebars
// var router = express.Router();

// Connect to the Mongo DB 
//le pones luego de localhost el nombre de la base de datos
mongoose.connect("mongodb://heroku_slg1bpgz:eessa6b9l2b7o3rv4jod2m2cef@ds139352.mlab.com:39352/heroku_slg1bpgz", { useNewUrlParser: true });

// Datos para conexión local
//mongodb://localhost/newsScrape


//------------------------------- Routes -----------------------------

/////////////////////////////// HTML ROUTES //////////----------------
var datos=[] 

app.get("/", function(req, res) {
  console.log("passed data",datos);
  res.render("index", {losarticulos: datos}); //Renderiza el index.handlebars
});


app.get("/saved", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
    res.render("saved", {lossaved:dbArticle});//Renderiza saved.handlebars
    })
    .catch(function(err) {
      res.json(err);
    });
});

/////////////////////////////// API ROUTES //////////-------------------

// Ruta para realizar un scrape de un sitio
// Esto es necesario para obtener los datos, correr esta ruta
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://medium.com/topic/popular").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // Now, we grab every h3 within an section tag, and do the following:
    $("section.m.n.o.fl.q.c h3").each(function(i, element) {
      // Save an empty result object
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      
      //Este if limita el número de noticias que se mostrarán y evita que salgan repetidas otra vez al hacer el trigger del scrape
      if (datos.length <=9){
        // Le mando la data de aquí obtenida a una variable externa para poderla leer en el render handlebars
        datos.push(result);
      }     
    });
    // If we were able to successfully scrape Articles, redirect to the main site where then you will see all the scraped articles
    res.redirect("/");
  }).catch(function(err) {
    res.json(err);
  });
});




// Inserto los articles a la api
app.post("/articles", function(req, res) {
  db.Article.create(req.body)  // Crear un nuevo artículo al recibir el post del front a esta api (en app.js)
  .then(function(dbArticle) {
    console.log("agregado a db",dbArticle);
    res.json(dbArticle);
  })
  .catch(function(err) {
    return res.json(err);
  });
});


// Obtengo en la api los articles
app.get("/articles", function(req, res) {
  db.Article.find({}) // Encuentro todos los articles de la database
  .then(function(dbArticle) {
    res.json(dbArticle);  
  })
  .catch(function(err) {
    res.json(err);
  });
});



// Route for saving/updating an Article's associated Note
// Aquí creas  una nota y la pones en su Article con su id
// El :id es el del artículo
// El $push avienta a un array los datos con determinada criteria. Si fuera $set, sobreescribiría
app.post("/articles/:id", function(req, res) {
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
  db.Note.create(req.body)
    .then(function(dbNote) {                                             
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{note: dbNote._id }   }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});



// Route for grabbing a specific Article by id, populate it with it's note
// Aquí le pones que a cada artículo le corresponde una nota
app.get("/articles/:id", function(req, res) {
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
    db.Article.findOne({ _id: req.params.id  })
      .populate("note") //este "note" es el que está en /models article
      .then(function(dbArticle) {
        console.log("notas",dbArticle)
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
});


// Obtener las notas por id nota
app.get("/notas/:id", function(req, res) {
  db.Note.findOne({ _id: req.params.id  })
      .then(function(dbNotas) {
        console.log("SOLO notas",dbNotas)
        res.json(dbNotas);
      })
      .catch(function(err) {
        res.json(err);
      });
});


// Borrar nota
// Borra en la collection nota, una nota, y luego en return actualiza en la collection articles ese artículo para borrarle la nota que tenía asociada adentro
// El $pull lo que hace es borrar todos los elementos que coincidan con una criteria
app.delete("/notas/:idnota/:idarticulo", function(req, res) {
  db.Note.deleteOne({ _id: req.params.idnota })
  .then(function() {                                             
    return db.Article.findOneAndUpdate({ _id: req.params.idarticulo }, {$pull: {note:req.params.idnota}}, { new: true });
  })
  .then(function(dbcompleto) {
    res.json(dbcompleto);
  })
  .catch(function(err) {
    res.json(err);
  });
});


// Borrar artículo 
app.delete("/articles/:id", function(req, res) {
  db.Article.deleteOne({ _id: req.params.id })
  .then(function(dbterminado) {
    res.json(dbterminado);
  })
  .catch(function(err) {
    res.json(err);
  });
});



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
