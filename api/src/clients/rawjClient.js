require('dotenv').config();
const axios = require ('axios'); //importo axios
const { get } = require('../routes');
const {YOUR_API_KEY} = process.env; // me traigo mi apikey de .env


const baseUrl = `https://api.rawg.io/api/$value$?key=${YOUR_API_KEY}`

const getAllVideoGames = async () => {
    const urlGet = baseUrl.replace("$value$", "games")
    const rawjVideoGamesResponse = await getToApiRest(urlGet)
    
    return mapResponseFromRawj(rawjVideoGamesResponse.data)
}

const getToApiRest = async(url) =>{
    return await axios.get(url)
}

const mapResponseFromRawj = (videoGames) =>{
    return videoGames.map( videoGame =>{                                                                
        const {
            name,
            background_image,
            genres,
            released,
            rating,
            platforms, 
            description
        } = videoGame 
 
        return {
            name : name,
            background_image : background_image,
            genres : getGenresInfo(genres),
            released : released,
            rating : rating,
            platforms : getPlatformsInfo(platforms),
            description : description
        }
    })
}


const getGenresInfo = (genres) =>{

}



    module.exports = {getAllVideoGames};