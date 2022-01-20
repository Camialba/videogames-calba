require('dotenv').config();
const axios = require('axios');
const mockAdapter = require("axios-mock-adapter");
const { assert } = require('chai');

const { getAllVideoGames } = require('../../src/clients/rawjClient.js');

const YOUR_API_KEY = process.env
const BASE_URL = `https://api.rawg.io/api$value$?key=${YOUR_API_KEY}`

describe('rawjClientTest', () => {
    it('getAllVideoGamesOkTest', async() => {

        const getAllUrl = BASE_URL.replace("$value$", "/games")

        var mock = new mockAdapter(axios);

        const data = { 
            count:147,
            next:'next_url',
            previous:null,
            results:[
                {
                    name:'Name Game 1',
                    platforms:[
                        {
                            platform:{
                                id:4,
                                name:'PC',
                                slug:'pc'
                            }
                        },
                        {
                            platform:{
                            id:187,
                            name:'PlayStation 5',
                            slug:'playstation5'
                            }
                        },
                        {
                            platform:{
                                id:1,
                                name:'Xbox One',
                                slug:'xbox-one'
                            }
                        }
                    ],
                    released:'2019-09-13',
                    background_image:'url_img',
                    rating:3.91,
                    id:1,
                    genres:[
                        {
                            id:2,
                            name:'Shooter',
                            slug:'shooter'
                        },
                        {
                            id:3,
                            name:'Adventure',
                            slug:'adventure'
                        }
                    ]
                },
                {
                    name:'Name Game 2',
                    platforms:[
                        {
                            platform:{
                                id:4,
                                name:'PCs',
                                slug:'pc'
                            }
                        },
                        {
                            platform:{
                            id:187,
                            name:'PlayStation 5s',
                            slug:'playstation5'
                            }
                        },
                        {
                            platform:{
                                id:1,
                                name:'Xbox Ones',
                                slug:'xbox-one'
                            }
                        }
                    ],
                    released:'2019-09-14',
                    background_image:'url_img_S',
                    rating:3,
                    id:11,
                    genres:[
                        {
                            id:2,
                            name:'Shooters',
                            slug:'shooter'
                        },
                        {
                            id:3,
                            name:'Adventures',
                            slug:'adventure'
                        }
                    ]
                }             
            ] 
        }

        mock.onGet(getAllUrl).reply(200, data);

    
        const res = await getAllVideoGames()


        assert.equal(res.length, 2)

        assert.equal(res[0].id, 1)
        assert.equal(res[0].name, "Name Game 1")
        assert.equal(res[0].backgroundmage,"url_img")
        assert.equal(res[0].genres[0], "Shooter")
        assert.equal(res[0].genres[1], "Adventure")
        assert.equal(res[0].released, "2019-09-13")
        assert.equal(res[0].rating, 3.91)
        assert.equal(res[0].platforms[0],"PC")
        assert.equal(res[0].platforms[1],"PlayStation 5")
        assert.equal(res[0].platforms[2],"Xbox One")


        assert.equal(res[1].id, 11)
        assert.equal(res[1].name, "Name Game 2")
        assert.equal(res[1].backgroundmage,"url_img_S")
        assert.equal(res[1].genres[0], "Shooters")
        assert.equal(res[1].genres[1], "Adventures")
        assert.equal(res[1].released, "2019-09-14")
        assert.equal(res[1].rating, 3)
        assert.equal(res[1].platforms[0],"PCs")
        assert.equal(res[1].platforms[1],"PlayStation 5s")
        assert.equal(res[1].platforms[2],"Xbox Ones")
 });

  
});
