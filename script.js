function getVals(){
  // Get slider values
  var parent = this.parentNode;
  var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat( slides[0].value );
    var slide2 = parseFloat( slides[1].value );
  // Neither slider will clip the other, so make sure we determine which is larger
  if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
  
  var displayElement = parent.getElementsByClassName("rangeValues")[0];
      displayElement.innerHTML = slide1 + " - " + slide2;
}

window.onload = function(){
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
      for( var x = 0; x < sliderSections.length; x++ ){
        var sliders = sliderSections[x].getElementsByTagName("input");
        for( var y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
            sliders[y].oninput = getVals;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
}

// API CALL

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    const apiUrl = `https://www.omdbapi.com/?apikey=58ad07&s=${encodeURIComponent(query)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function displayResults(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; 

    if (data.Response === "False") {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    data.Search.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';
        movieDiv.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <p>IMDb ID: ${movie.imdbID}</p>
            <p>Type: ${movie.Type}</p>
        `;
        resultsContainer.appendChild(movieDiv);
    });
}

// SORT FUNCTION

const movies = [
    { title: "The Fast and the Furious", poster: "https://m.media-amazon.com/images/M/MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_SX300.jpg", imdbID: "tt0232500", year: 2001 },
    { title: "Fast & Furious 6", poster: "https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg", imdbID: "tt1905041", year: 2013 },
    { title: "Fast Five", poster: "https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg", imdbID: "tt1596343", year: 2011 },
    { title: "Fast & Furious", poster: "https://m.media-amazon.com/images/M/MV5BM2Y1YzhkNzUtMzhmZC00OTFkLWJjZDktMWYzZmQ0Y2Y5ODcwXkEyXkFqcGc@._V1_SX300.jpg", imdbID: "tt1013752", year: 2009 },
    { title: "The Fast and the Furious: Tokyo Drift", poster: "https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg", imdbID: "tt0463985", year: 2006 },
    { title: "2 Fast 2 Furious", poster: "https://m.media-amazon.com/images/M/MV5BOTQzYzEwNWMtOTAwYy00YWYwLWE1NTEtZTkxOGQxZTM0M2VhXkEyXkFqcGc@._V1_SX300.jpg", imdbID: "tt0322259", year: 2003 },
    { title: "Fast & Furious Presents: Hobbs & Shaw", poster: "https://m.media-amazon.com/images/M/MV5BNmU4OTA5NGYtMTFjMS00MzgxLWFjNTMtYjdlMThlYzc4M2M4XkEyXkFqcGc@._V1_SX300.jpg", imdbID: "tt6806448", year: 2019 },
    { title: "F9: The Fast Saga", poster: "https://m.media-amazon.com/images/M/MV5BODJkMTQ5ZmQtNzQxYy00ZWNlLWI0ZGYtYjU1NzdiMjcyNDRmXkEyXkFqcGc@._V1_SX300.jpg", imdbID: "tt5433138", year: 2021 },
    { title: "Fast X", poster: "https://m.media-amazon.com/images/M/MV5BYzEwZjczOTktYzU1OS00YjJlLTgyY2UtNWEzODBlN2RjZDEwXkEyXkFqcGc@._V1_SX300.jpg", imdbID: "tt5433140", year: 2023 },
    { title: "Fast Times at Ridgemont High", poster: "https://m.media-amazon.com/images/M/MV5BMWM4NTc3N2YtMjk2Ny00MTRmLWE4YzItNTVhMTRlODVkNmE5XkEyXkFqcGc@._V1_SX300.jpg", imdbID: "tt0083929", year: 1982 },
];

// Function to sort movies
function sortMovies(order) {
    return movies.sort((a, b) => {
        return order === "ascending" ? a.year - b.year : b.year - a.year;
    });
}

// Function to display movies
function displayMovies(sortedMovies) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    
    sortedMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.textContent = `${movie.title} (${movie.year})`;
        movieDiv.innerHTML = `
            <h3>${movie.title} (${movie.year})</h3>
            <img src="${movie.poster}" alt="${movie.title} poster" style="width:100px;">
            <p>IMDB ID: ${movie.imdbID}</p>
        `;
        resultsContainer.appendChild(movieDiv);
    });
}

// Event listener for sort order change
document.getElementById('sortOrder').addEventListener('change', displayMovies);

const sortOrder = document.getElementById('sortOrder');
sortOrder.addEventListener('change', function() {
    const sortedMovies = sortMovies(sortOrder.value);
    displayMovies(sortedMovies);
});

// Initial display
displayMovies(movies);

// Toggle Hamburger

function openMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.add('active'); // Add active class to show menu
}

function closeMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.remove('active'); // Remove active class to hide menu
}

