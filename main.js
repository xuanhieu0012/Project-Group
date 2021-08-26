const animeListURL ='https://api.aniapi.com/v1/anime'
const watchListURL ='http://localhost:3000/favList'
function getAnimeList(){
    fetch(animeListURL,{
        headers: {
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
          },
    })
    .then(res => res.json())
    .then(animeListArray => {
        //console.log(animeListArray.data.documents)
        displayAnimeList(animeListArray.data.documents)
        displayAnimeHomePage(animeListArray.data.documents)
        
        //handlerBtnWatchList(arrayAnime)
        
    })
    .catch(err => console.log(err))
}


function displayAnimeList(animeListArray){
    const featuredAnime = document.querySelector("#featuredAnime > div")
    featuredAnime.id = "picture-wrapper"
    const topAnimeArr = []
    // this loop just get top 10 anime and return in topAnimeArr
    for(let i = 0; i < 10; i++){
      
        topAnimeArr.push(animeListArray[i])
    }
   
    //handlerBtnWatchList(topAnimeArr)
    topAnimeArr.forEach(bestAnime =>{
         const createImgTag = document.createElement('img')
         createImgTag.src = bestAnime["cover_image"]
         
         createImgTag.id = bestAnime["anilist_id"]
         featuredAnime.appendChild(createImgTag)
         const buttonWatchList = document.querySelector("#anime-detail > button")
         buttonWatchList.style.visibility = 'hidden'

         createImgTag.addEventListener('click', e =>{
             // show up image 

             const upperDiv = document.querySelector('#anime-detail');
             upperDiv.classList.remove('hidden');

            const animeDetailImage = document.querySelector("#anime-detail > img")
            animeDetailImage.src = e.target.src
            //show the title of anime
            const animeDetailName = document.querySelector("#anime-detail > h2")
            animeDetailName.textContent = bestAnime.titles.en
            //show the description of anime
            const spanDetailA = document.querySelector("#anime-detail > h3.detail-anime > p > span")

            spanDetailA.textContent = `Season: ${bestAnime['season_period']}---Total episodes: ${bestAnime['episodes_count']}`
          

            const animeDescription = document.querySelector("#anime-detail > h3.description > p")
            

            animeDescription.textContent =(bestAnime.descriptions.en).replaceAll('<br>',"").replaceAll("</br>", "").replaceAll('</i>',"").replaceAll('<i>',"")
           
            //like button
            buttonWatchList.style.visibility = 'visible'
            buttonWatchList.className = "addWatchList";
            buttonWatchList.textContent = "Add to Watchlist";
            buttonWatchList.id =  bestAnime["anilist_id"]

            
            
         })
    })
    //console.log(topAnimeArr)

    handlerBtnWatchList(topAnimeArr)
    

}
function handlerBtnWatchList (topTenarray) {
    const btn = document.querySelector("#anime-detail > button")

    btn.addEventListener('click', e=>{
        const btnID = btn.id
        // let headers = document.querySelector("#watchList > h2")
        // headers.textContent ="My Favorite WatchList"
        // let img = document.querySelector("#anime-detail > img")
        // let imgDisplay = document.createElement('img')
        // let displayInWatchList =document.querySelector("#watchList > div")
        // imgDisplay.src = img.src
        // displayInWatchList.appendChild(imgDisplay)
       
        
        handlerLikeList(btnID,topTenarray)
    }

    
    )


}
function handlerArrow(){
    let buttonLeft = document.querySelector("#slideLeft")
    let buttonRight = document.querySelector("#slideRight")
    buttonLeft.addEventListener('click', e => {
        document.querySelector("#picture-wrapper").scrollLeft -= 180
    })

    buttonRight.addEventListener('click', e => {
        document.querySelector("#picture-wrapper").scrollLeft += 180
    })
}



function displayAnimeHomePage(arrayAnime){
        
     arrayAnime.forEach(anime =>{
        
        
        const genres = anime['genres']
        checkGenres(genres, anime, arrayAnime)
        
    })
 }


function checkGenres(genres, anime, arrayAnime){
const actionAnime = document.querySelector("#action-type > div")
const comedyAnime = document.querySelector("#comedy-type > div")
const dramaAnime = document.querySelector("#drama-type > div")

    

    genres.forEach(genresList =>{
    //handlerBtnWatchList(arrayAnime)

    if(genresList.toLowerCase() === "action"){
        
        const addWatchList = document.createElement("button");
        let imgTag = document.createElement('img')
        addWatchList.className = "addWatchList";
        addWatchList.textContent = "Add to Watchlist";
        imgTag.id = anime["anilist_id"]
        imgTag.src = anime["cover_image"]

        addWatchList.addEventListener('click', e =>{
           
        const aniID = imgTag.id
        console.log(aniID)
        handlerLikeList(aniID, arrayAnime)})
        
        actionAnime.append(  imgTag, addWatchList)
        
     }else if(genresList.toLowerCase() === "comedy" ){
        const addWatchList = document.createElement("button");
        let imgTag = document.createElement('img')
         addWatchList.className = "addWatchList";
        addWatchList.textContent = "Add to Watchlist";
        imgTag.id = anime["anilist_id"]

        imgTag.src = anime["cover_image"]

        addWatchList.addEventListener('click', e =>{
            
        const aniID = imgTag.id
        console.log(aniID)
        handlerLikeList(aniID, arrayAnime)})

        comedyAnime.append(imgTag, addWatchList)
        

    }else if(genresList.toLowerCase() === "drama" ){
        const addWatchList = document.createElement("button");
        let imgTag = document.createElement('img')
        addWatchList.className = "addWatchList";
        addWatchList.textContent = "Add to Watchlist";

        imgTag.id = anime["anilist_id"]

        imgTag.src = anime["cover_image"]

        addWatchList.addEventListener('click', e =>{
            
        const aniID = imgTag.id

        handlerLikeList(aniID, arrayAnime)})

        dramaAnime.append(imgTag, addWatchList)
    }
   
})}







 

//handlerBtnWatchList()


function handlerLikeList(aniID, arrayAnime){


arrayAnime.forEach(eachAnime =>{
    // console.log(eachAnime["anilist_id"])
    if (parseInt(aniID) === eachAnime["anilist_id"]){
        
        const favList = {
            anilist_id:        eachAnime["anilist_id"]  ,
            banner_image:      eachAnime["banner_image"],
            cover_image:       eachAnime["cover_image"] ,
            descriptions:      eachAnime["descriptions"].en,
            end_date:          eachAnime["end_date"],
            episode_duration:  eachAnime["episode_duration"],
            episodes_count:    eachAnime["episodes_count"],
            format:            eachAnime["format"],
            genres:            eachAnime["genres"],
            mal_id:            eachAnime["mal_id"],
            score:             eachAnime["score"],
            season_period:     eachAnime["season_period"],
            season_year:       eachAnime["season_year"],
            start_date:        eachAnime["start_date"] ,
            status:            eachAnime["status"],
            titles:            eachAnime["titles"].en,
            trailer_url:       eachAnime["trailer_url"]
        }
        
        
        fetch('http://localhost:3000/favList',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                

            },
            body: JSON.stringify(favList)

        })
        .then(res => res.json())
        .then(anime => {console.log(anime)
            displayWatchList(anime)
        })
        
       
    }

})


}


function displayAnimeHomePage(arrayAnime){
        

    arrayAnime.forEach(anime =>{
        //console.log(anime)
        
        const genres = anime['genres']
        checkGenres(genres, anime, arrayAnime)
        
    })
 }


function handlerWatchList(){
    fetch(watchListURL)
    .then(res =>res.json())
    .then (animeWatchList => animeWatchList.forEach(anime => displayWatchList(anime)))

}


function displayWatchList(anime){
   const title = document.querySelector('#watchlist h1');
   title.textContent = 'My Watchlist' 
   
    
    
    // animeWatchList.forEach(anime =>{
        console.log(anime)
        //create image
        let imgTagWatchList = document.createElement('img')
        imgTagWatchList.src = anime['cover_image']
        document.querySelector("#watchList > div").appendChild(imgTagWatchList)
        imgTagWatchList.addEventListener('click', e =>{
            
            const animeID = anime.id
            favoriteListDes( anime, animeID, imgTagWatchList)
            

        })
    
}

function favoriteListDes( anime, animeID, e){
   const container = document.querySelector('#watchlist-container');
   container.classList.remove('hidden');
    
    // paragraph description
    const descriptionFav = document.querySelector("#watchlist-container > p")
          if(anime.descriptions === ''){
            descriptionFav.textContent = 'No description available at this time.';
        } else if(typeof (anime.descriptions) === 'string') {
            descriptionFav.textContent = (anime.descriptions).replaceAll('<br>',"").replaceAll("</br>", "").replaceAll('</i>',"").replaceAll('<i>',"");
        } else  if(anime.descriptions.en === ''){
            descriptionFav.textContent = 'No description available at this time.';
        } else {
            descriptionFav.textContent = anime.descriptions.en;
        };
    //name anime
    const animeName = document.querySelector("#watchlist-title")
         animeName.textContent = anime.titles
         if(typeof anime.titles === 'string') {
            animeName.textContent = anime.titles;
        } else {
            animeName.textContent = anime.titles.en;
        };
    // epsiode
    const animeEpsiode = document.querySelector("#episodesWatchlist")
          animeEpsiode.textContent = `Number of Episodes: ${anime["episodes_count"]}`

    // duration watch
    const animeDuration = document.querySelector("#durationWatchlist")
          animeDuration.textContent = `Length of Episode(s): ${anime["episode_duration"]} minutes`
    // rating
    const animeRating = document.querySelector("#ratingWatchlist")
          animeRating.textContent= `Rating: ${anime.score}/100`
    // genres
    const animeGenres = document.querySelector("#genresWatchlist")
        //   animeGenres.textContent =`GENRES: ${anime.genres.join(', ')}`;
          if(anime.genres.length < 6){
            animeGenres.textContent = `GENRES: ${anime.genres.join(', ')}`;
        } else {
            const genreArr = anime.genres
            animeGenres.textContent = `GENRES: ${(genreArr.slice(0, 4).join(', '))}`;}
          console.log(anime)
    //trailer link
    const animeTrailer = document.querySelector('#watchlist-container a')
    animeTrailer.classList = 'trailer-url';
    animeTrailer.textContent = 'TRAILER';
    animeTrailer.title = 'trailer';
    animeTrailer.href = anime['trailer_url'];

    const buttonContainer = document.querySelector('#watchlist-button-container');
    buttonContainer.innerHTML = '';
    const button = document.createElement('button');
    button.textContent = 'Delete from Watchlist';
    buttonContainer.appendChild(button);
    button.addEventListener('click', () => {
        removeAnimeFavList(animeID)
        
        descriptionFav.textContent = '';
        animeName.textContent = '';
        animeEpsiode.textContent = '';
        animeDuration.textContent = '';
        animeRating.textContent = '';
        animeTrailer.textContent = '';
        animeGenres.textContent = '';
        buttonContainer.innerHTML = '';
        e.src='';
    } );
 

}
function removeAnimeFavList(animeID){
    fetch(`http://localhost:3000/favList/${animeID}`, {
        method: "DELETE"
    })

}




function init(){
handlerArrow()
getAnimeList()
handlerWatchList()

}







init()