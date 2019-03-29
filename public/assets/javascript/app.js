// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {

    // Run scraper for New York Times
    $(".scrapeBtn").on("click", function (event) {

        // var type = $(this).data("type");
        // console.log("type", type)

        $.ajax("/scrape", {
            type: "POST"
        }).then(function () {

            location.reload();
        });
    });

    // Save an article
    $(".saveBtn").on("click", function (event) {

        let _id = $(this).parents(".card").data("_id");
        console.log("_id", _id)

        $.ajax({
            method: "PUT",
            url: "/api/saved/" + _id,
        }).then(function () {

            location.reload();
        })
    });

    // Show all saved articles
    $(".savedBtn").on("click", function (event) {

        location.href = '/saved';
    })

    // Clear all articles
    $(".clearBtn").on("click", function (event) {

        $.ajax({
            method: "DELETE",
            url: "/api/deleteAll/",
        }).then(function () {

            location.reload();
        })
    })

    // Delete saved articles
    $(".deleteBtn").on("click", function (event) {

        let _id = $(this).parents(".card").data("_id");
        console.log("_id", _id)

        $.ajax({
            method: "DELETE",
            url: "/api/delete/" + _id,
        }).then(function () {

            location.reload();
        })
    })


});
