// PSEUDOCODE AREA: //
//take an input value and store value (title names, genre, year)
//make an api call based on user input 
var twitterKey = "YmkJyoGYpwbFNoXb1N9EP5PRy";














var queryURL = "http://www.omdbapi.com/?t="
var queryKey = "&apikey=21754fe3"
var genreName = []; // variable for genre name
var genreId = []; // variable for genre Id
var apiKey = "e57e846268be194f276bcd176242c9a4";


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
        console.log(genre);
        for (let i = 0; i < genre.length; i++) {
            genreId.push(genre[i].id);
            genreName.push(genre[i].name);
        }

    })
    
}
genreGenerator();

// this function returns a list of movies based on the user input
// not recommendations but just making sure the user is selecting the 
// right movie because there are many movies with many titles
function movieSearch(userInput) {
    
    var potentialMovies = []; // list of movies that the user may be trying to select
    var potentialId = []; // list of correlating ID movie codes that the user may be trying to select
    var encoded = encodeURI(userInput);
    var movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=e57e846268be194f276bcd176242c9a4&query=" + encoded;
   
    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
            console.log("id" , data.results[0].id);
            for (let i = 0; i < data.results.length; i++) {
                potentialMovies.push(data.results[i].original_title);
                potentialId.push(data.results[i].id);
            }
            console.log(potentialMovies);
            console.log(potentialId);
        }
   )}


// button press that will activate the search 
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
$("#movieBtn").on("click", function(event){
    event.preventDefault();
    //grabbing user input
    var movieInput = $("#mySearch").val();
    //var textContent = $(this).siblings("#mySearch").val();
    $(".movieOne").empty();
    movieSearch(movieInput);
});


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