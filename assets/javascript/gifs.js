$(document).ready(function() {

var topics = ["Football","Baseball","Golf","Tennis","Basketball","Hockey","Soccer","Boxing","Rugby","Swimming"]
var results;


function makeButtons () {
    
    $("#sport-buttons").empty();

    for (i = 0; i < topics.length; i++) {

        var b = $("<button>");

        b.addClass("sport-btn");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);

        $("#sport-buttons").append(b);
    };

};

$("#add-sport").on("click", function(event) {

    event.preventDefault();

    var sports = $("#sport-input").val().trim();

    topics.push(sports);
    $("#sport-input").val("");

    makeButtons();

    console.log(topics);


});

makeButtons();

function dataPull() {

    var sportsName = $(this).attr("data-name");
    var sportsStr = sportsName.split(" ").join("+");
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + sportsStr + "&api_key=xk01q9mEBG6UkU6448q6ieLO8YMCsJGm&limit=10";

            $.ajax({
        url: giphyURL,
        method: "GET"
      }).done(function(response) {

        console.log(giphyURL);
        console.log(response);

        results = response.data;

        $("#gifs").empty();
        for (var i = 0; i < results.length; i++) {

            var sportsDiv = $("<div>");
            var para = $("<p class ='rating'>").text("Rating: " + results[i].rating);
            var sportImage = $("<img>");

            para.addClass("rating-text")

            sportImage.addClass("image-gifs")
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr("data-state", "still");
                sportImage.attr("data-position", i);

            sportsDiv.append(para);
            sportsDiv.append(sportImage);
            sportsDiv.addClass("individual-gifs")

            $("#gifs").prepend(sportsDiv);


        };

      });

    };

    $(document).on("click", ".sport-btn", dataPull);

    function gifAnimation() {
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position");
        position = parseInt(position);

        console.log(results[position].images.fixed_height.url);
        console.log(position);

        if (state === "still") {
            console.log();
            $(this).attr("src", results[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", results[position].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
        }
        };

        $(document).on("click", ".image-gifs", gifAnimation);

    })







