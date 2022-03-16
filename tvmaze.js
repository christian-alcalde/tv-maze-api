"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const DEFAULT_IMG = "https://tinyurl.com/tv-missing";
const API_BASE_URL = "http://api.tvmaze.com";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(show) {
  let response = await axios.get(`${API_BASE_URL}/search/shows`, {
    params: { q: show },
  });

  return response.data.map((showData) => {
    let showImg = showData.show.image;
    showImg === null
      ? (showImg = DEFAULT_IMG)
      : (showImg = showData.show.image.original);

    // Shortened this code with ternary operator on line 22
    // if (showImg === null) {
    //   // default image if null
    //   showImg = DEFAULT_IMG;
    // } else {
    //   // if the object exists, choose the original sized image
    //   showImg = showData.show.image.original;
    // }

    // returning object with specified key/value pairs
    return {
      id: showData.show.id,
      name: showData.show.name,
      summary: showData.show.summary,
      image: showImg,
    };
  });
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt="TV show picture"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {}

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
