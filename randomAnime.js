
function getAnimeList(){
    fetch('https://api.aniapi.com/v1/anime',{
        headers: {
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
          },
    })
    .then(res => res.json())
    .then(animeListArray => {
        
        displayAnimeHomePage(animeListArray.data.documents)
        //console.log(animeListArray.data.documents)
    })
    .catch(err => console.log(err))
}

function displayAnimeHomePage(arrayAnime){
        

        arrayAnime.forEach(anime =>{
            //console.log(anime)
            
            const genres = anime['genres']
            checkGenres(genres, anime, arrayAnime)
            
        })


}
getAnimeList()

function checkGenres(genres, anime, arrayAnime){
    const actionAnime = document.querySelector("#action-type > div")
    const comedyAnime = document.querySelector("#comedy-type > div")
    const dramaAnime = document.querySelector("#drama-type > div")
    const likeBttn = document.createElement("button");
  
    let imgTag = document.createElement('img')
        likeBttn.className = "like-bttn";
        likeBttn.textContent = "♥";
        // likeBttn.addEventListener('click', e =>{
        //     console.log(imgTag.id)
        // })

    genres.forEach(genresList =>{
        
        if(genresList.toLowerCase() === "action"){
            
            imgTag.id = anime["anilist_id"]
            imgTag.src = anime["cover_image"]
            likeBttn.addEventListener('click', e =>{
            const aniID = imgTag.id
            handlerLikeList(aniID, arrayAnime)
        })
            
        actionAnime.append(  imgTag, likeBttn)
        }else if(genresList.toLowerCase() === "comedy"){
            
            imgTag.src = anime["cover_image"]
            
            comedyAnime.append(imgTag, likeBttn)
        }else if(genresList.toLowerCase() === "drama"){
            
            imgTag.src = anime["cover_image"]
           
            dramaAnime.append(imgTag, likeBttn)
        }
       
    }
    )
    
   

}
handlerEvent()
function handlerEvent(){
    const displayAnime = document.querySelector("body > div.display-anime")
    displayAnime.addEventListener('click', e =>{
        if(e.target.matches('img')){

            
        }
    })
}


function handlerLikeList(aniID, arrayAnime){
    console.log(aniID)
    
    arrayAnime.forEach(eachAnime =>{
        // console.log(eachAnime["anilist_id"])
        if (parseInt(aniID) === eachAnime["anilist_id"]){
            const favListArr = []
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
            favListArr.push(favList)
            
            fetch('http://localhost:3000/favList',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                    

                },
                body: JSON.stringify(favListArr)

            })
            .then(res =>res.json())
        }

    })



    
    

}