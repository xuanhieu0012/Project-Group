const animeListURL ='https://api.aniapi.com/v1/anime'

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
        displayAnimeList(animeListArray.data.documents)})
    .catch(err => console.log(err))
}


function displayAnimeList(animeListArray){
    const featuredAnime = document.querySelector("#featuredAnime")
    const topAnimeArr = []

    // this loop just get top 10 anime and return in topAnimeArr
    for(let i = 0; i < 10; i++){
      
        topAnimeArr.push(animeListArray[i])
    }

    topAnimeArr.forEach(bestAnime =>{
         const createImgTag = document.createElement('img')
         createImgTag.src = bestAnime["cover_image"]
         createImgTag.id = animeListArray["anilist_id"]
         featuredAnime.appendChild(createImgTag)

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
            // const videoTrailer = document.querySelector("#anime-detail > h4 > video")
            // console.log(videoTrailer.src = bestAnime['trailer_url'])
            
            
         })
    })
    console.log(topAnimeArr)
  

}


getAnimeList();


// function paginated_fetch(

//     url = animeListURL, // Improvised required argument in JS
//     current_page = 1,
//     previousResponse = []
//   ) {
//     return fetch(`${url}&current_page=${page}`) // Append the page number to the base URL
//       .then(response => response.json())
//       .then(newResponse => {
//         const response = [...previousResponse, ...newResponse]; // Combine the two arrays
  
//         if (newResponse.length !== 0) {
//           page++;
  
//           return paginated_fetch(url, page, response);
//         }
  
//         return response;
//       });
//   }
// paginated_fetch()

//