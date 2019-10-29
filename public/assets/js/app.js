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

    $(".add-Note").on("click", () =>{
        const thisID = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url:"/articles" + thisID,
            data:{
                body:$("#notes-text" + thisID).val()
            }
        }).then((data)=>{
            console.log(data);
            $("notes-text" + thisID).val('');
            $("modal-notes").modal("hide");
            window.location.href = window.location.origin + "/articles-saved"
        })
    })

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