const BASEURL ='https://api.aniapi.com/v1/anime'

// -------- MAIN SEARCH FUNCTION --------//
function filterSearch() {

    const formInput = document.querySelector('#animeSearch');
    const formDropDown = document.querySelector('#form-dropdown');
    formInput.addEventListener('submit', e => {

        const animeInput = e.target.animeInput.value;
        e.preventDefault();

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
                   filterRender(individualTitle, individualId);
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
                filterRender(individualTitle, individualId);
            };

        });

    });

};


// -------- RENDERING SEARCH RESULTS FUNCTION --------// 
function filterRender(title, id) {

    const div = document.querySelector('#searched-anime');
    const newImg = document.querySelector('.searched-container img');
    const newTrailer = document.querySelector('#searched-anime a');
    const genreHeader = document.querySelector('#genres');
    const genreList = document.querySelector('#genre-list');
    const p = document.querySelector('#search-description');

    const h3 = document.createElement('h3');
    h3.textContent = title;
    div.appendChild(h3);

    h3.addEventListener('click', () => {
        fetch(`https://api.aniapi.com/v1/anime/${id}`)
        .then(resp => resp.json())
        .then(obj => {

            newImg.src = obj.data['cover_image'];
            newImg.classList = 'searched-image'
            p.textContent = (obj.data.descriptions.en).replaceAll('<br>',"").replaceAll("</br>", "").replaceAll('</i>',"").replaceAll('<i>',"");
            newTrailer.classList = 'trailer-url';
            newTrailer.textContent = 'TRAILER';
            newTrailer.title = 'trailer';
            newTrailer.href = obj.data['trailer_url']
            genreHeader.textContent = 'GENRES:';
            const genreArr = obj.data.genres;
            genreList.innerHTML = '';

            for(let i = 0; i < 5; i++) {
                const li = document.createElement('li');
                li.textContent = genreArr[i];
                genreList.appendChild(li);
            };

        });
    });

    const formInput = document.querySelector('#animeInput');
    formInput.addEventListener('click', () => {
        newDiv.remove();
    });
    
}; 

filterSearch();
