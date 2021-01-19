import axios from 'axios';
exports.Poke = (req, res) => {

    const POKE_API_ROOT = "https://poke-acs.herokuapp.com/api/guess";

    const pokeInstance = axios.create({
    baseURL: POKE_API_ROOT
    })

    setTimeout(( () => {
        const {
            message
              } = pokeInstance.get('/poke');
        console.log('poking')
        
    } ), 1000 * 3)
    res.status(200).send({message: 'success poking'});
}
