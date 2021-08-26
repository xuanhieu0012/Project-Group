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
const addWatchList = document.createElement("button");

let imgTag = document.createElement('img')
    addWatchList.className = "addWatchList";
    addWatchList.textContent = "Add to Watchlist";
    

genres.forEach(genresList =>{
    //handlerBtnWatchList(arrayAnime)
    if(genresList.toLowerCase() === "action"){
        
        imgTag.id = anime["anilist_id"]
        imgTag.src = anime["cover_image"]
        addWatchList.addEventListener('click', e =>{
           
        const aniID = imgTag.id
        handlerLikeList(aniID, arrayAnime)})
        
        actionAnime.append(  imgTag, addWatchList)
     }else if(genresList.toLowerCase() === "comedy"){
        
        imgTag.src = anime["cover_image"]
        addWatchList.addEventListener('click', e =>{
        const aniID = imgTag.id
        handlerLikeList(aniID, arrayAnime)})
        comedyAnime.append(imgTag, addWatchList)
    }else if(genresList.toLowerCase() === "drama"){
        
        imgTag.src = anime["cover_image"]
        addWatchList.addEventListener('click', e =>{
        const aniID = imgTag.id
        handlerLikeList(aniID, arrayAnime)})
        dramaAnime.append(imgTag, addWatchList)
    }
   
})}



function displayAnimeHomePage(arrayAnime){
        

    arrayAnime.forEach(anime =>{
        //console.log(anime)
        
        const genres = anime['genres']
        checkGenres(genres, anime, arrayAnime)
        
    })
 }



 

//handlerBtnWatchList()


function handlerLikeList(aniID, arrayAnime){
//console.log(aniID)

arrayAnime.forEach(eachAnime =>{
    // console.log(eachAnime["anilist_id"])
    if (parseInt(aniID) === eachAnime["anilist_id"]){
        
        const favList = {
            anilist_id:        eachAnime["anilist_id"]  ,
            banner_image:      eachAnime["banner_image"],
            cover_image:       eachAnime["cover_image"] ,
            descriptions:      eachAnime["descriptions"],
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
            titles:            eachAnime["titles"],
        }
        
        
        fetch('http://localhost:3000/favList',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                

            },
            body: JSON.stringify(favList)

        })
        .then(res =>res.json())
    }

})






}





function handlerWatchList(){
    fetch(watchListURL)
    .then(res =>res.json())
    .then (animeWatchList =>displayWatchList(animeWatchList))

}


function displayWatchList(animeWatchList){
    
   
    
    // const descriptionList = document.querySelector("#watchlist-container > p")
    // animeWatchList.forEach(anime =>{
    //     console.log(anime)
    //     //create image
    //     let imgTagWatchList = document.createElement('img')
    //     imgTagWatchList.src = anime['cover_image']
    //     document.querySelector("#watchList").appendChild(imgTagWatchList)
    //     imgTagWatchList.addEventListener('click', e =>{

    //     })
    // })
}





function init(){
handlerArrow()
getAnimeList()
handlerWatchList()

}







init()