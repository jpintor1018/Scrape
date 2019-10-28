$(document).ready(function () {
    $("#scrapeBtn").on("click", function () {
        $("#clickedArticles").text("");
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(() => {
            $.ajax({
                method: "GET",
                url: "/articles"
            }).then(() => window.location.href = window.location.origin + "/articles")
        })
    })

    $(".save").on("click", (e) => {
        const id = $(e.target).data("id")
        $.put("/save", {
            id: id
        }, () => console.log("saved"))
    })
    $("#btn-saved").on("click",()=> {
        $.ajax("/articles-saved",{
            type:"GET"
        })
            .then(() => window.location.href = window.location.origin + "/articles-saved")
        });    

    $(".del-article").on("click", (e) =>{
        const id = $(e.target).data("id")
        $.ajax({
            url:"/del-article/" + id,
            method: "DELETE"
        }).then(() => window.location.href = window.location.origin + "/articles-saved")
    })
    $.put = function (url, data, callback, type) {

        if ($.isFunction(data)) {
            type = type || callback,
                callback = data,
                data = {}
        }

        return $.ajax({
            url: url,
            type: 'PUT',
            success: callback,
            data: data,
            contentType: type
        });
    }

});