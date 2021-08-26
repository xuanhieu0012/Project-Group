const BASEURL ='https://api.aniapi.com/v1/anime'

// -------- MAIN SEARCH FUNCTION --------//
function filterSearch() {
    const divSearchBox = document.querySelector('#searched-anime');
        divSearchBox.style.visibility = 'hidden'
    const formInput = document.querySelector('#animeSearch');
    const formDropDown = document.querySelector('#form-dropdown');
    formInput.addEventListener('submit', e => {
        e.preventDefault();
        const animeInput = e.target.animeInput.value;
        divSearchBox.style.visibility = 'visible'

        if(formDropDown.selectedIndex === 1){
            filterTitle(animeInput);
            formInput.reset();
        } else if(formDropDown.selectedIndex === 2){
            filterGenre(animeInput);
            formInput.reset();
        } else {
            formInput.reset();
            console.log('Please Specify Input Type!');
        };

    });

};


// -------- SUB-SEARCH FUNCTIONS --------//
function filterTitle(input) {

    fetch(BASEURL)
    .then(resp => resp.json())
    .then(output => {

        const animeArr = output.data.documents;
        animeArr.filter(individualAnime => {

            const individualTitle = individualAnime.titles.en;
            const individualId = individualAnime.id;

            if(individualTitle.substring(0, 3).toUpperCase() === input.substring(0, 3).toUpperCase() ||
               individualTitle.substring(0, 2).toUpperCase() === input.substring(0, 2).toUpperCase() ||
               individualTitle.substring(0, 1).toUpperCase() === input.substring(0, 1).toUpperCase() ||
               individualTitle.toUpperCase() === input.toUpperCase()) {
                   titleRender(individualTitle, individualId);
               };

        });

    });

};

function filterGenre(input) {

    fetch(BASEURL)
    .then(resp => resp.json())
    .then(output => {

        const animeArr = output.data.documents;
        animeArr.filter(individualAnime => {

            const individualAnimeGenres = individualAnime.genres;
            const individualTitle = individualAnime.titles.en;
            const individualId = individualAnime.id;

            if(individualAnimeGenres.find(genre => genre.toUpperCase() === input.toUpperCase())) {
                titleRender(individualTitle, individualId);
            };

        });

    });

};


// -------- RENDERING/RESETTING SEARCH RESULTS FUNCTIONS --------// 
function titleRender(title, id) {

    const div = document.querySelector('#searched-anime');
    const h3 = document.createElement('h3');
    h3.textContent = title;
    div.appendChild(h3);

    const parent = document.querySelector('#search-parent');
    parent.classList.remove('hidden');

    h3.addEventListener('click', () => titleDetailsRender(title, id));
    
}; 

function titleDetailsRender(title, id) {

    fetch(`${BASEURL}/${id}`)
    .then(resp => resp.json())
    .then(obj => {

        const exisitingH2 = document.querySelector('#static-title');
        exisitingH2.textContent = title;

        const existingH3 = document.querySelector('#episodes');
        existingH3.textContent = `Number of Episodes: ${obj.data['episodes_count']}`;

        const duration = document.querySelector('#duration');
        duration.textContent = `Length of Episode(s): ${obj.data['episode_duration']} minutes`;

        const rating = document.querySelector('#rating');
        rating.textContent = `Rating: ${obj.data.score}/100`;

        const divContainer = document.querySelector('#searched-container');
        divContainer.classList = 'decorate-container';

        const newImg = document.querySelector('#searched-container img');
        newImg.src = obj.data['cover_image'];
        newImg.classList = 'searched-image';

        const p = document.querySelector('#searched-container p');
        p.id = 'search-description';
        p.textContent = (obj.data.descriptions.en).replaceAll('<br>',"").replaceAll("</br>", "").replaceAll('</i>',"").replaceAll('<i>',"");

        const newTrailer = document.querySelector('#searched-container a');
        newTrailer.classList = 'trailer-url';
        newTrailer.textContent = 'TRAILER';
        newTrailer.title = 'trailer';
        newTrailer.href = obj.data['trailer_url'];

        const genreHeader = document.querySelector('#genres');
        genreHeader.textContent = 'GENRES:';
        genreHeader.style.textDecoration = 'underline';

        const genreList = document.querySelector('#genre-list');
        genreList.innerHTML = '';

        const genreArr = obj.data.genres;
        for(let i = 0; i < 5; i++) {
            const li = document.createElement('li');
            li.textContent = genreArr[i];
            genreList.appendChild(li);
        };

        const buttonContainer = document.querySelector('#button-container');
        buttonContainer.innerHTML = '';
        const button = document.createElement('button');
        button.textContent = 'Add to Watchlist';
        buttonContainer.appendChild(button);
        button.addEventListener('click', () => addToWatchlist(id));

    });

};

function searchReset() {

    const div = document.querySelector('#searched-anime');
    div.innerHTML = '';

    const divContainer = document.querySelector('#searched-container');
    divContainer.classList = '';

    const newImg = document.querySelector('#searched-container img');
    newImg.src = '';

    const p = document.querySelector('#searched-container p');
    p.textContent = '';

    const exisitingH3 = document.querySelector('#static-title');
    exisitingH3.textContent = '';

    const genreHeader = document.querySelector('#genres');
    const genreList = document.querySelector('#genre-list');
    genreList.innerHTML = '';
    genreHeader.textContent = '';

    const newTrailer = document.querySelector('#searched-container a');
    newTrailer.textContent = '';

    const buttonContainer = document.querySelector('#button-container');
    buttonContainer.innerHTML = '';

    const episode = document.querySelector('#episodes');
    episode.textContent = ''; 

    const duration = document.querySelector('#duration');
    duration.textContent = '';

    const rating = document.querySelector('#rating');
    rating.textContent = '';

    const watchcontainer = document.querySelector('#watchlist-container');
    watchcontainer.classList.add('hidden');

    const parent = document.querySelector('#search-parent');
    parent.classList.add('hidden');

    const upperDiv = document.querySelector('#anime-detail');
    upperDiv.classList = 'hidden'



};


// -------- RENDERING WATCHLIST FUNCTION --------// 
function addToWatchlist(id) {

        const newCoverPhoto = document.createElement('img');
        const watchList = document.querySelector('.watchlist-container');
        const watchListHeader = document.querySelector('#watchList h2');

        fetch(`${BASEURL}/${id}`)
        .then(resp => resp.json())
        .then(obj => {
                console.log(obj)
            const genreArr = obj.data.genres;
            const newToWatchAnime = {
                "cover_image": obj.data['cover_image'],
                "anilist_id": obj.data['anilist_id'],
                "descriptions": obj.data.descriptions.en,
                "episode_duration": obj.data['episode_duration'],
                "episodes_count": obj.data["episodes_count"],
                "score": obj.data.score,
                "titles": obj.data.titles.en,
                "genres": [genreArr[0], genreArr[1], genreArr[2], genreArr[3],  genreArr[4]],
                "trailer_url": obj.data['trailer_url'],
                "banner_image": obj.data['banner_image'],
                "end_date": obj.data['end_date'],
                "format": obj.data.format,
                "mal_id": obj.data['mal_id'],
                "season_period": obj.data["season_period"],
                "season_year": obj.data["season_year"],
                "start_date": obj.data["start_date"],
                "status": obj.data.status
            };
            

            fetch('http://localhost:3000/favList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(newToWatchAnime)
                })
            .then(resp => resp.json())
            .then(object => {
                const newId = object.id;
                newCoverPhoto.src = obj.data['cover_image'];
                newCoverPhoto.addEventListener('click', () => {
                    
                    watchlistRenderDetails(newToWatchAnime, newId, newCoverPhoto)});
            })

            watchList.appendChild(newCoverPhoto);
           
            

        
        });

};

 function watchlistRenderDetails (anime, newId, photo) {
    console.log(anime)

    const exisitingH2 = document.querySelector('#watchlist-title');
    exisitingH2.textContent = anime.titles;

    const existingH3 = document.querySelector('#episodesWatchlist');
    existingH3.textContent = `Number of Episodes: ${anime["episodes_count"]}`;

    const duration = document.querySelector('#durationWatchlist');
    duration.textContent = `Length of Episode(s): ${anime['episode_duration']} minutes`;

    const rating = document.querySelector('#ratingWatchlist');
    rating.textContent = `Rating: ${anime.score}/100`;

    const p = document.querySelector('#watchlist-container p');
    p.id = 'search-description-watchlist';
    p.textContent = (anime.descriptions).replaceAll('<br>',"").replaceAll("</br>", "").replaceAll('</i>',"").replaceAll('<i>',"");

    const newTrailer = document.querySelector('#watchlist-container a');
    newTrailer.classList = 'trailer-url';
    newTrailer.textContent = 'TRAILER';
    newTrailer.title = 'trailer';
    newTrailer.href = anime['trailer_url'];

    const genreHeader = document.querySelector('#genresWatchlist');
    genreHeader.textContent = `GENRES: ${(anime.genres)}`;

    const buttonContainer = document.querySelector('#watchlist-button-container');
    buttonContainer.innerHTML = '';
    const button = document.createElement('button');
    button.textContent = 'Delete from Watchlist';
    buttonContainer.appendChild(button);
    button.addEventListener('click', () => {
        removeAnime(anime, newId);
        
        exisitingH2.textContent = '';
        existingH3.textContent = '';
        duration.textContent = '';
        rating.textContent = '';
        p.textContent = '';
        newTrailer.textContent = '';
        genreHeader.textContent = '';
        buttonContainer.innerHTML = '';
        photo.src = '';
    } );
 }

 function removeAnime(anime, newId) {
     console.log(anime)
    fetch(`http://localhost:3000/favList/${newId}`, {
        method: "DELETE"
    })

 }



filterSearch();

const formInput = document.querySelector('#animeInput');
formInput.addEventListener('click', () => searchReset());

