require('dotenv').config();

const axios = require ('axios');
const YOUR_API_KEY = process.env
const baseUrl = `https://api.rawg.io/api$value$?key=${YOUR_API_KEY}`

const getAllVideoGames = async () => {
    const urlGet = baseUrl.replace("$value$", "/games")

    const rawjVideoGamesResponse = await getToApiRest(urlGet)
    return mapResponseAllGamesFromRawj(rawjVideoGamesResponse.data.results)
}

const getToApiRest = async(url) =>{
    return await axios.get(url)
}

const mapResponseAllGamesFromRawj = (videoGames) =>{
    return videoGames.map( videoGame =>{                                                                
        const {
            id,
            name,
            background_image,
            genres,
            released,
            rating,
            platforms, 
            description
        } = videoGame 
 
        return {
            id: id,
            name : name,
            backgroundmage : background_image,
            genres : getGenresInfo(genres),
            released : released,
            rating : rating,
            platforms : getPlatformsInfo(platforms),
            description : description
        }
    })
}

const getGenresInfo = (genres) =>{
    return genres.map(genre => genre.name)
}

const getPlatformsInfo = (platforms) =>{
return platforms.map(p => p.platform.name)
}
    

module.exports = {getAllVideoGames};