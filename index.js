const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

function getData(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`
  }
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}

function renderResults(result) {
  return `
    <div>
      <h2>
      <a href="${result.html_url}" target="_blank">${result.name}</a></h2>
    </div>
  `;
}

function displaySearchResultsFromApi(data) {
  const results = data.items.map((item, index) => renderResults(item));
  $('.searchResults').html(results);
}

function watchSubmitForm() {
  $('.searchForm').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.jsQuery');
    const query = queryTarget.val();
    queryTarget.val("");
    getData(query, displaySearchResultsFromApi);
  });
}

$(watchSubmitForm);
