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
var movieDates = [];



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
    })
}
console.log(genre);
genreGenerator();


// this function returns a list of movies based on the user input
// not recommendations but just making sure the user is selecting the 
// right movie because there are many movies with many titles
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
            console.log(potentialIds.length);
            console.log(movieDates.length);
            console.log(potentialMovies.length)

            recommend(potentialIds[0]); // should not be called in here only  putting it in here to test; but this should only 
                                        // be used when clicking on the correct button 
    }
    )
}

var genreInput = "Action"; // will be a drop down selection
var directorInput = false; // click or not clicked 
var rating = false; // click or not clicked 

//this function recommends movies based on movie ID and parameters
//appends to a final recommendList (only has the parameters for genre...still need director and rating filter)
function recommend(movieId) {
    var movieUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apiKey + "&language=en-US&page=1"
    recommendList = [];

    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
        for (let i = 0; i < data.results.length; i++) {
            var list = data.results[i].genre_ids;
            var idx = genreName.indexOf(genreInput);    //gets the index of the genre input in the name array
            if (list.includes(genreId[idx])) {          //checks if the input value for the genreInput
                recommendList.push(data.results[i].id)
                return recommendList; //appends to reccomendList if the movie has the same genre as the userinput
                console.log(recommendList);
            }
            }
        })
}



// button press that will activate the initial search 
$("#movieBtn").on("click", function(event){
    event.preventDefault();
    //grabbing user input
    var movieInput = $("#mySearch").val();
    //var textContent = $(this).siblings("#mySearch").val();
    $(".movieOne").empty();
    movieSearch(movieInput);
});

























































//////////////////////////////////////////////////////////////////////////////////

//Derek's Lines /////////////////////////////////////////////////////////////////
// $("#movieBtn").on("click", function(event){
//     event.preventDefault();
//     //grabbing user input
//     var movieInput = $("#mySearch").val();
//     //var textContent = $(this).siblings("#mySearch").val();
//     $(".movieOne").empty();
//     movieSearch(movieInput);
// });


// function movieSearch (moviename){
//     var movieApi = queryURL + moviename + queryKey;


//     $.ajax({
//         url: movieApi,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);

//     $(".movieOne").empty();
    

// //Possible values we may want from this call
// //Rated, Poster, Title, Year, imdbRating, Genre
// var movieTitle = $("<h2>").text(response.Title);
// console.log(response.Title);
// var movieYear = $("<p>").text(response.Year);
// console.log(response.Year);
// var criticRating = $("<p>").text(response.Ratings[0].Value);
// console.log(response.Ratings[0].Value);
// var movieGenre = $("<p>").text(response.Genre);
// console.log(response.Genre);
// var movieRating = $("<p>").text(response.Rated);
// console.log(response.Rated);


// var displayMovie = $("<div>");
// //appending all to div I created
// displayMovie.append(movieTitle, movieYear, movieGenre, movieRating, criticRating);
// //targeting html element
// $(".movieOne").html(displayMovie);

// })
// }

//hiding modal upon X button click. working
$(".hide").on("click", function(){
    $("#id01").hide();
})


function nytReview (userInput){
    var nyReview = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + userInput + "&api-key=cfswTPvkAAO6whxPPliiN3Hw0COpKs61"


    $.ajax({
        url: nyReview,
        method: "GET"
    }).then(function (response) {
        console.log(response);

})
}

nytReview("inception");
































/////////////////////////////////////////////////////////////////////////////////
//<!-- Script for Sidebar, Tabs, Accordions, Progress bars and slideshows -->
//<script>
// Side navigation
// function w3_open() {
//     var x = document.getElementById("mySidebar");
//     x.style.width = "100%";
//     x.style.fontSize = "40px";
//     x.style.paddingTop = "10%";
//     x.style.display = "block";
// }
// function w3_close() {
//     document.getElementById("mySidebar").style.display = "none";
// }

// // Tabs
// function openCity(evt, cityName) {
//     var i;
//     var x = document.getElementsByClassName("city");
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     var activebtn = document.getElementsByClassName("testbtn");
//     for (i = 0; i < x.length; i++) {
//         activebtn[i].className = activebtn[i].className.replace(" w3-dark-grey", "");
//     }
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " w3-dark-grey";
// }

// var mybtn = document.getElementsByClassName("testbtn")[0];
// mybtn.click();

// // Accordions
// function myAccFunc(id) {
//     var x = document.getElementById(id);
//     if (x.className.indexOf("w3-show") == -1) {
//         x.className += " w3-show";
//     } else {
//         x.className = x.className.replace(" w3-show", "");
//     }
// }

// // Slideshows
// var slideIndex = 1;

// function plusDivs(n) {
//     slideIndex = slideIndex + n;
//     showDivs(slideIndex);
// }

// function showDivs(n) {
//     var x = document.getElementsByClassName("mySlides");
//     if (n > x.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = x.length };
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     x[slideIndex - 1].style.display = "block";
// }

// showDivs(1);

// // Progress Bars
// function move() {
//     var elem = document.getElementById("myBar");
//     var width = 5;
//     var id = setInterval(frame, 10);
//     function frame() {
//         if (width == 100) {
//             clearInterval(id);
//         } else {
//             width++;
//             elem.style.width = width + '%';
//             elem.innerHTML = width * 1 + '%';
//         }
//     }
// }
// //test test test