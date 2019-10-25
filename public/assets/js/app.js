$(document).ready(function(){
$("#scrapeBtn").on("click", function() {
    $("#clickedArticles").text("");
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function() {
        window.location.href = window.location.origin+"/scrape"
    })
})
});



articles();


function articles() {
$.ajax({
    method: "GET",
    url:"/articles",
}).then(function)
    
                     }
  
  
 