// PSEUDOCODE AREA: //
//take an input value and store value (title names, genre, year)
//make an api call based on user input 
var twitterKey = "YmkJyoGYpwbFNoXb1N9EP5PRy";














var queryURL = "http://www.omdbapi.com/?t="
var queryKey = "&apikey=21754fe3"


//Daniel's Lines //////////////////////////////////////////////////////////////
function tmdb() {
    var apiKey = "e57e846268be194f276bcd176242c9a4";
    var user_input = 'Horror';
    // var movieUrl = "https://api.themoviedb.org/3/movie/464052?api_key=" + apiKey + "&language=en-US"; 
    // var movieUrl = "https://api.themoviedb.org/3/genre/movie?api_key=e57e846268be194f276bcd176242c9a4&language=en-US&query=" + user_input +"&page=1&include_adult=false"
    var movieUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=e57e846268be194f276bcd176242c9a4&language=en-US"
    $.ajax({
        url: movieUrl,
        method: "GET"
    }).then(function (data) {
        console.log(data);
    })
    
}

tmdb();

























































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


function movieSearch (moviename){
    var movieApi = queryURL + moviename + queryKey;


    $.ajax({
        url: movieApi,
        method: "GET"
    }).then(function (response) {
        console.log(response);

    $(".movieOne").empty();
    

//Possible values we may want from this call
//Rated, Poster, Title, Year, imdbRating, Genre
var movieTitle = $("<h2>").text(response.Title);
console.log(response.Title);
var movieYear = $("<p>").text(response.Year);
console.log(response.Year);
var criticRating = $("<p>").text(response.Ratings[0].Value);
console.log(response.Ratings[0].Value);
var movieGenre = $("<p>").text(response.Genre);
console.log(response.Genre);
var movieRating = $("<p>").text(response.Rated);
console.log(response.Rated);


var displayMovie = $("<div>");
//appending all to div I created
displayMovie.append(movieTitle, movieYear, movieGenre, movieRating, criticRating);
//targeting html element
$(".movieOne").html(displayMovie);

})
}

//hiding modal upon X button click. working
$(".hide").on("click", function(){
    $("#id01").hide();
})


// function tweetSearch (){
//     var tweetApi = "https://api.twitter.com/2/tweets/search/all?query=from%3Atwitterdev%20new%20-is%3Aretweet&max_results=10 -H Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAHmhUQEAAAAATIwAaMoN%2B6juUYwSfvkawMLNLRM%3DGzpERjEZugh998Ua0ky9Yk10iGubWIMS8D6AZl1iKf634hnFSw";


//     $.ajax({
//         url: tweetApi,
//         //header: 'Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAHmhUQEAAAAATIwAaMoN%2B6juUYwSfvkawMLNLRM%3DGzpERjEZugh998Ua0ky9Yk10iGubWIMS8D6AZl1iKf634hnFSw',
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);


//     })
// }
// tweetSearch();
const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointURL = "https://api.twitter.com/2/tweets?ids=";

async function getRequest() {

    // These are the parameters for the API request
    // specify Tweet IDs to fetch, and any additional fields that are required
    // by default, only the Tweet ID and text are returned
    const params = {
        "ids": "1278747501642657792,1255542774432063488", // Edit Tweet IDs to look up
        "tweet.fields": "lang,author_id", // Edit optional query parameters here
        "user.fields": "created_at" // Edit optional query parameters here
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAHmhUQEAAAAATIwAaMoN%2B6juUYwSfvkawMLNLRM%3DGzpERjEZugh998Ua0ky9Yk10iGubWIMS8D6AZl1iKf634hnFSw`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();


































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