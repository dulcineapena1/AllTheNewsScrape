// Guarda artículo
$(document).on("click", "#savearticle", function() {
  var laInfoSeleccionada= $(this).parent().text();
  console.log(laInfoSeleccionada);

  $.ajax({
    method: "POST",
    url: "/articles" ,
    data: {
      title: laInfoSeleccionada
    }
  })
    .then(function(data) {
      console.log("post article",data);
    });
});



// Despliega MODAL para guardar nota
$(document).on("click", "#addnote", function() {
  var estemodal= $(this).attr("data-idmongo");
  console.log("idmongo",estemodal);
  
  $("#myModal[data-baseform='"+estemodal+"']").toggle(); //Abre el modal que tenga el id del boton addnote clickeado
  // Borro las notas del modal seleccionado, porque al hacer el prepend abajo, las duplica
  $("#notasguardadas[data-notasguardadas='"+estemodal+"']").empty();
  // Now make an ajax call for the note in one article
  $.ajax({
    method: "GET",
    url: "/articles/" + estemodal
  })
    .then(function(data) {
      console.log("Toda la data",data)
      for (var i = 0; i < data.note.length; i++){
        console.log("La data de notas",data.note);
        $("#notasguardadas[data-notasguardadas='"+estemodal+"']").prepend("<h2>" + data.note[i].thenote + "</h2><button id=borrarlanota data-idarticulob='"+estemodal+"' data-idnotab='"+data.note[i]._id+"'>"+"Delete note"+"</button>")
      }
    });
});


//Guarda nota del modal
$(document).on("click", "#boton-registro", function() {
  event.preventDefault();
  var elIdArticle= $(this).attr("data-idmongoForm");
  console.log(elIdArticle);
  $("#myModal[data-baseform='"+elIdArticle+"']").toggle(); //Cierra el modal que tenga el id del boton addnote clickeado

  $.ajax({
    method: "POST",
    url: "/articles/" + elIdArticle ,
    data: {
      thenote: $("#llenar-nota[data-llenarnota='"+elIdArticle+"']").val(),  //thenote está en /models
    }
  })
    .then(function(data) {
      console.log("add note data",data);
    });
});



// Borra nota
$(document).on("click", "#borrarlanota", function() {
  var estanota= $(this).attr("data-idnotab");
  var estearticulo= $(this).attr("data-idarticulob");
  // Ocupamos el id de la nota y el id del artículo, porque vamos a borrar la nota de la collection nota y 
  // en la collection articles le vamos a quitar la nota asociada
  $.ajax({
    method: "DELETE",
    url: "/notas/" + estanota +"/" + estearticulo
  }).then(location.reload());
});


// Borra artículo y sus notas asociadas
$(document).on("click", "#deletearticle", function() {
  var estearticulo= $(this).attr("data-iddeletearticle");
  //var lasNotasDeEsteArticulo =[];

  // $.ajax({
  //   method: "GET",
  //   url: "/articles/" + estearticulo
  // })
  //   .then(function(data) {
  //     for (var i = 0; i < data.note.length; i++){
  //       // Guardo los ids de las notas de este artículo, para luego poderla borrar en su collection notas
  //       lasNotasDeEsteArticulo.push(data.note[i]._id);
  //     }
  //   })

  $.ajax({
    method: "DELETE",
    url: "/articles/" + estearticulo 
  }).then(location.reload());
});




// // Trigger de scrape
// $(document).on("click", "#irAScrape", function() {
//   window.location.href= "/scrape"
//   location.reload();
// });




// Cerrar el modal (cancel)
$(document).on("click", "#cancelar-llenado-nota", function() {
  location.reload()
});