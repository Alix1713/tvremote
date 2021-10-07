// PSEUDOCODE AREA: //
//take an input value and store value (title names, genre, year)
//make an api call based on user input 
var twitterKey = "YmkJyoGYpwbFNoXb1N9EP5PRy";














// var queryURL = "http://www.omdbapi.com/?t="
// var queryKey = "&apikey=21754fe3"
var genreName = []; // variable for genre name
var genreId = []; // variable for genre Id
var apiKey = "e57e846268be194f276bcd176242c9a4";
var potentialMovies = []; // list of movies that the user may be trying to select
var potentialIds = []; // list of correlating ID movie codes that the user may be trying to select
var recommendList = []; //list of recommendations that fit the search criteria 
var movieDates = []; //list of movie dates that correlate with the movies 



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

    var encoded = encodeURI(userInput);
    var movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=e57e846268be194f276bcd176242c9a4&query=" + encoded;

    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
        for (let i = 0; i < data.results.length; i++) {
            potentialMovies.push(data.results[i].original_title); //potential movies added to a list
            potentialIds.push(data.results[i].id);  // potential movies' ID added to a list
            movieDates.push(data.results[i].release_date); // the release date for all the money
        }
        console.log(potentialIds);
        console.log(movieDates);
        console.log(potentialMovies);

        recommend(potentialIds[0]); // should not be called in here only  putting it in here to test; but this should only 
        // be used when clicking on the correct button 
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
    recommendList = [];

    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {

        for (let i = 0; i < 3; i++) {
            var random = randomNum(data.results.length);
            var pick_title = data.results[random].title;
            var pick_date = data.results[random].release_date;
            var pick_overiew = data.results[random].overview;
            var pick_img = data.results[random].poster_path;

            var trending = $("<h1>").text(pick_title);
            nytReview(pick_title, pick_date);

            $("<p>").text(pick_date);
            $("<p>").text(pick_overiew);
            var displayMovie = $("<div>");
            var moviePoster = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500/" + pick_img);
            moviePoster.attr("style", "height: 300px");
            displayMovie.append(trending, moviePoster);
            if (i == 0) {
                $(".movieOne").html(displayMovie);
            } else if (i == 1) {
                $(".movieTwo").html(displayMovie);
            } else {
                $(".movieThree").html(displayMovie);
                break;
            }

            console.log(data.results[random]);
            console.log(pick_overiew);

            localStorage.setItem("ourPicks", JSON.stringify(pick_title))
            var pastSearch = $("<div>")
            var searchDiv = $("<p>").text(pick_title);
            pastSearch.append(searchDiv);

            $(".w3-center").append(pastSearch);
        }
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
    movieSearch(movieInput);
});

























































//////////////////////////////////////////////////////////////////////////////////

//Derek's Lines /////////////////////////////////////////////////////////////////

function trendingMovies() {
    var movieApi = "https://api.themoviedb.org/3/trending/movie/week?api_key=e57e846268be194f276bcd176242c9a4&query=";
    //var topThree = [];

    $.ajax({
        url: movieApi,
        method: "GET"
    }).then(function (response) {

        var trendingZero = $("<h1>").text(response.results[0].title)
        //console.log(trendingZero)
        var trendingOne = $("<h1>").text(response.results[1].title)
        //console.log(trendingOne)
        var trendingTwo = $("<h1>").text(response.results[2].title)

        var movieZeroPoster = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500/" + response.results[0].backdrop_path);
        movieZeroPoster.attr("style", "height: 300px")

        var movieOnePoster = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500/" + response.results[1].backdrop_path);
        movieOnePoster.attr("style", "height: 300px")

        var movieTwoPoster = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500/" + response.results[2].backdrop_path);
        movieTwoPoster.attr("style", "height: 300px")

        var displayMovieZero = $("<div>")
        displayMovieZero.append(trendingZero, movieZeroPoster);
        $(".movieOne").html(displayMovieZero, movieZeroPoster);

        var displayMovieOne = $("<div>")
        displayMovieOne.append(trendingOne, movieOnePoster);
        $(".movieTwo").html(displayMovieOne, movieOnePoster);

        var displayMovieTwo = $("<div>")
        displayMovieTwo.append(trendingTwo, movieTwoPoster);
        $(".movieThree").html(displayMovieTwo, movieTwoPoster);

    })
};
trendingMovies();

//hiding modal upon X button click. working
$(".hide").on("click", function () {
    $("#id01").hide();
})

$("#movieBtn").on("click", function () {
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


