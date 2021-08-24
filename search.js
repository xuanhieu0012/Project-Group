//Roger's COde, Yet to be cleaned up lol
function filterSearch() {
    const formInput = document.querySelector('#animeSearch');

    formInput.addEventListener('submit', e => {
        e.preventDefault();

        fetch(animeListURL)
        .then(resp => resp.json())
        .then(data => {

            const animeArr = data.data.documents
            const animeInput = e.target.animeInput.value.toUpperCase();

            animeArr.filter(oneAnime => { 
                const animeTitle = oneAnime.titles.en;
                const animeId = oneAnime.id;

                if(animeTitle.substring(0, 3).toUpperCase() === animeInput.substring(0, 3)) {
                    displaySearchResults(animeTitle, animeId);
                    formInput.reset();
                    } 

                })

            })

        })

}

function displaySearchResults(title, id) {
    const displayDiv = document.querySelector('#searched-anime');
    const newDiv = document.createElement('div');
    const p = document.createElement('p');

    newDiv.classList = 'searched-container';
    p.classList = id;
    p.textContent = title;
 
    newDiv.appendChild(p)
    displayDiv.appendChild(newDiv);

    p.addEventListener('click', e => {
        console.log(e)
        fetch(`https://api.aniapi.com/v1/anime/${id}`)
        .then(resp => resp.json())
        .then(obj => {
            const searchImg = document.createElement('img');
            const newP = document.createElement('p');
            const a = document.createElement('a');

            searchImg.src = obj.data['cover_image']
            searchImg.classList = 'searched-image'
            searchImg.id = obj.data.id;
            newP.textContent = obj.data.descriptions.en;
            a.classList = 'trailer-url';
            a.textContent = 'TRAILER'; 
            a.title = 'trailer';
            a.href = obj.data['trailer_url']

            newDiv.append(searchImg, newP, a);
            console.log(obj)})
    })

}

const formInputValue = document.querySelector('#animeInput');
formInputValue.addEventListener('keydown', e => console.log(e.target.value))

filterSearch();
