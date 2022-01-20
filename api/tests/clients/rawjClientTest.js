const axios = require('axios');
const mockAdapter = require("axios-mock-adapter");
const { assert } = require('chai');

const { getAllVideoGames } = require('../../src/clients/rawjClient.js');

const YOUR_API_KEY = process.env
const baseUrl = `https://api.rawg.io/api/$value$?key=${YOUR_API_KEY}`

describe('rawjClientTest', () => {
    it('getAllVideoGamesOkTest', async() => {
        //preparo la url a la que le va a pegar internamente el metodo
        const getAllUrl = baseUrl.replace("$value$", "games")

        //creo un nuevo mockAdapter (es algo especifico de axios para inicializar sus boludeses internas)
        var mock = new mockAdapter(axios);

        /*Creo el objeto que me va a responder cuando hago la pegada, 
        no es 100% igual al de rawj solo le puse los datos que usamos  
        el resto nuestra funcion no lo requiere da igual si esta o no la lista de opiniones ponele;) */
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
                    released:'2019-09-13',
                    background_image:'url_img_S',
                    rating:3,
                    id:1,
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

        /*utilizando el mock le digo, cuando le pegues a la url que arme, devolve un 200 
        ( las web apis tienen una serie de status que dictaminan como termino la peticion los mas usados son
            200 OK
            400 RECURSO NO ENCONTRADO
            500 ERROR INTERNO
        )
        pueden googlearlo como codigos de respuesta REST
        
        */
        mock.onGet(getAllUrl).reply(200, data);

        //ahora llamo a la funcion que internamente le va a pegar a la url y va a hacer toda su magia
        const res = await getAllVideoGames()

        /*
        assert es una palabra reservada de CHAI
        se utiliza para simplemente evaluar el resultado, aca abajo 
        si res no tiene 2 elementos, tiraria un error el test daria rojo
        si tiene 2 elementos tira verde
        */

        assert.equal(res.length, 2)


        //DESAFIO en este test faltan asserts, estaria bueno corroborar que la info adentro viene como esperamos
        //PISTA esto se resuelve usando varios assert equal y recorriendo los elementos de la lista ;)
  })});
