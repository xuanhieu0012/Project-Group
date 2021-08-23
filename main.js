// our code goes here
const animeListURL ='https://api.aniapi.com/v1/anime'

function getAnimeList(){
    fetch(animeListURL)
    .then(res => res.json())
    .then(animeListArray => {console.log(animeListArray.data.documents)
        displayAnimeList(animeListArray.data.documents)})
}
getAnimeList()

function displayAnimeList(animeListArray){
    const featuredAnime = document.querySelector("#featuredAnime")
    
    for(let i = 0; i < 10; i++){

        const createImgTag = document.createElement('img')
        createImgTag.src = animeListArray[i]["cover_image"]
        featuredAnime.appendChild(createImgTag)
    }
}
