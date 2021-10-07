

// var queryURL = "http://www.omdbapi.com/?t="
// var queryKey = "&apikey=21754fe3"
var genreName = []; // variable for genre name
var genreId = []; // variable for genre Id
var apiKey = "e57e846268be194f276bcd176242c9a4";
var potentialMovies = []; // list of movies that the user may be trying to select
var potentialIds = []; // list of correlating ID movie codes that the user may be trying to select
var movieDates = []; //list of movie dates that correlate with the movies 

load();

//Daniel's Lines //////////////////////////////////////////////////////////////

// this function generates all the possible genre name 
// and adds the two values to two separate lists
function genreGenerator() {
    // var movieUrl = "https://api.themoviedb.org/3/movie/464052?api_key=" + apiKey + "&language=en-US"; // specific example using movie id 
    var movieUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=e57e846268be194f276bcd176242c9a4&language=en-US" // list of all genres that they offer

    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
        genre = data.genres;
        for (let i = 0; i < genre.length; i++) {
            genreId.push(genre[i].id);
            genreName.push(genre[i].name);
        }
        console.log(genreId.length);
        console.log(genreName.length);
    })
}

genreGenerator();


// this function returns a list of movies based on the user input
// not recommendations but just making sure the user is selecting the 
// right movie because there are many movies with many titles
// this function will add movie titles, their ids, and release date to a list
function movieSearch(userInput) {

    // this resets the list everytime we do a search
    potentialMovies = []; // list of movies that the user may be trying to select
    potentialIds = []; // list of correlating ID movie codes that the user may be trying to select
    movieDates = []; // list of release dates that correspond with the movie
    $('#selectionList').empty();

    var encoded = encodeURI(userInput); //encoded URI this api does not just take strings but only encodedURI
    var movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=e57e846268be194f276bcd176242c9a4&query=" + encoded;

    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
        console.log(data.results);
        for (let i = 0; i < data.results.length; i++) {
            potentialMovies.push(data.results[i].original_title); //potential movies added to a list
            potentialIds.push(data.results[i].id);  // potential movies' ID added to a list
            movieDates.push(data.results[i].release_date); // the release date for all the money
            var movie = $('<li>').text(data.results[i].original_title + " " + data.results[i].release_date);
            var movie_link = $('<a onclick="return recommend(' + data.results[i].id + ')">').append(movie);
            $("#selectionList").append(movie_link);

        }
    }
    )
}

var genreInput = "Action"; // will be a drop down selection
var directorInput = false; // click or not clicked 
var toprated = false; // click or not clicked 

//this function recommends movies based on movie ID and parameters
//appends to a final recommendList (only has the parameters for genre...still need director and rating filter)
function recommend(movieId) {
    var movieUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apiKey + "&language=en-US&page=1"

    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
        var randomList = [];
        for (let i = 0; i < 3; i++) {
            var random = randomNum(data.results.length); //choosing a random index within the movies
            if (!data.results.length) {
                var p = "<p>paragraph 2</p>";
                $("#modal").append("We do not have any recommendations for this movie!");
            } else {
                var p = "<p>paragraph 1</p>";
                $("#modal").append("");
            }
            var pick_title = data.results[random].title;   //storing the data of the title, date, overview, and img of the movies
            var pick_date = data.results[random].release_date;
            var pick_overiew = data.results[random].overview;
            var pick_img = data.results[random].poster_path;
            pick_date = pick_date.substring(0, 4)

            // var movie_title = $("<h1>").text(pick_title); //creating h1 tags and p tags dynamically to add to the ticketed screen
            var movie_date = $('<h1>').text(pick_date);

            nytReview(pick_title, pick_date); //call to nyt reviews

            $("<p>").text(pick_overiew);    //this is the information for the ticket cards 
            var displayMovie = $("<div>");
            var moviePoster = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500/" + pick_img);
            moviePoster.attr("style", "width: auto");
            displayMovie.append(moviePoster, movie_date);

            if (i == 0) {                               //this adds the information to the card from left ot right
                $(".movieOne").html(displayMovie);
            } else if (i == 1) {
                $(".movieTwo").html(displayMovie);
            } else {
                $(".movieThree").html(displayMovie);
            }

            localStorage.setItem("ourPicks" + i, JSON.stringify(pick_title)) //sets the items for the search history 
            var pastSearch = $("<div>")
            var searchDiv = $("<a href=#>").text(pick_title);
            pastSearch.append(searchDiv);

            $("#recentsearch").append(pastSearch);


        }
        $("#id01").hide();
    })
}



// random number generator 
function randomNum(num) {
    return Math.floor(Math.random() * num)
};


//output single movie data based on movie id
function topPicks(movieId) {
    var movieUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey + "&language=en-US"
    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
        console.log(data);
    })
}

// button press that will activate the initial search 
$("#movieBtn").on("click", function (event) {
    event.preventDefault();
    //grabbing user input
    var movieInput = $("#mySearch").val();
    $(".movieOne").empty();
    $(".movieTwo").empty();
    $(".movieThree").empty();
    $("#recentsearch").empty();
    movieSearch(movieInput);
});



function load() {
    for (i = 0; i < 3; i++) {
        var titles = localStorage.getItem("ourPicks" + i);
        var titlesDiv = $("<div>");
        var titlesA = $("<a href=#>").text(titles);

        titlesDiv.append(titlesA);

        $("#recentsearch").append(titlesDiv);
    }
}




//////////////////////////////////////////////////////////////////////////////////

//Derek's Lines /////////////////////////////////////////////////////////////////

function trendingMovies() {
    var movieApi = "https://api.themoviedb.org/3/trending/movie/week?api_key=e57e846268be194f276bcd176242c9a4&query=";
    //var topThree = [];

    $.ajax({
        url: movieApi,
        method: "GET"
    }).then(function (response) {
        console.log(response);

       for (let i = 0; i < 3; i++){
        
        var movieDisplay = $("<div>")
        var moviePoster = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500/" + response.results[i].poster_path)
        moviePoster.attr("style", "width: auto")
        movieDisplay.append(moviePoster);

            if (i == 0){
                $(".movieOne").html(movieDisplay)
            } else if (i == 1){
                $(".movieTwo").html(movieDisplay)
            } else {
                $(".movieThree").html(movieDisplay)
            }
        
        }
    })
};
trendingMovies();


    

    

//hiding modal upon X button click. working
$(".hide").on("click", function () {
    $("#id01").hide();
})


function nytReview(review) {
    var nyReview = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + review + "&api-key=cfswTPvkAAO6whxPPliiN3Hw0COpKs61"

    $.ajax({
        url: nyReview,
        method: "GET"
    }).then(function (response) {
        console.log(response);

    })
}


