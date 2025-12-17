let searchValue = "";
function handleInputChange(event) {
  searchValue = event.target.value;
}

function rerouteToMoviesPage() {
  if (searchValue.trim().length === 0) {
    alert("Please search for a valid movie title.");
    return;
  }
  window.location.href = `${
    window.location.origin
  }/movies.html?search=${encodeURIComponent(searchValue)}`;
}   
