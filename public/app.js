// When you click the save button
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
      console.log("post ajax",data);
    });

});


// When you click the add note button
// Despliega MODAL
$(document).on("click", "#addnote", function() {
  var estemodal= $(this).attr("data-idmongo");
  console.log("idmongo",estemodal);
  //$("#myModal").attr("data-baseform",estemodal).toggle();
  $("#myModal[data-baseform='"+estemodal+"']").toggle(); //Abre el modal que tenga el id del boton addnote clickeado

  // Now make an ajax call for the note in one article
  $.ajax({
    method: "GET",
    url: "/articles/" + estemodal
  })
    .then(function(data) {
      console.log("data.thenote",data[0].note); //data[0].note.thenote
      $("#notasguardadas").append("<h2>" + data.thenote + "</h2>");
      //$("#notasguardadas[data-notasguardadas='"+estemodal+"']")
  
    });




});


// When you click the save note button
// Guarda info de modal
$(document).on("click", "#boton-registro", function() {
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



