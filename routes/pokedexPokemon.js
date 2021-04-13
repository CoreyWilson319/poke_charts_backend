const router = require("express").Router();
const auth = require("../middleware/auth");
const axios = require("axios");

// POST
// ADD POKEMON TO POKEDEX DATABASE
// ONLY NEEDS TO BE RAN ONCE TO FILL DB
router.get("/seed",  async (req, res) => {

    // Leaving off here, make a function for the first api call, if next == true use recurssion and run function again on next
    // else do nothing done
    try {

        async function seedData(link){
            let allPokemon = await axios.get(link)
            allPokemon = await allPokemon
            allPokemon.data.results.forEach(pokemon => {
                axios.get(pokemon.url)
                .then((singlePokemon) => {
                    // FILL DATA HERE

                })
            })
            if (await allPokemon.data.next != null) {
                await seedData(allPokemon.data.next)
            }
            res.status(200).json({msg: "seeding finished"})
    }
    seedData("https://pokeapi.co/api/v2/pokemon?offset=0")
}
        catch(err) {
            res.status(400).json({msg: err})
    }
})

// GET 'pokedex'
// SHOW ALL POKEMON

// GET 'pokedex/:id'
// SHOW SINGLE POKEMON BY DEX NUMBER (ID)

module.exports = router;
