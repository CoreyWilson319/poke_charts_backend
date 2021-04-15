const router = require("express").Router();
const auth = require("../middleware/auth");
const axios = require("axios");
let Pokemon = require("../models/pokedexPokemon.model");

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
                    // console.log(singlePokemon.data)
                    // FILL DATA HERE
                    Pokemon.findOne({ dex: singlePokemon.id }).then((poke) => {
                        const newPokemon = new Pokemon({
                            name: singlePokemon.data.name,
                            dex: singlePokemon.data.id,
                            // ability_1: singlePokemon.data.abilities[0].ability.name,
                            // ability_2: singlePokemon.data.abilities[1],
                            // // hidden_ability: singlePokemon.abilities[2],
                            move_pool: singlePokemon.data.moves,
                            // hp: singlePokemon.stats[0],
                            // attack: singlePokemon.stats[1],
                            // defense: singlePokemon.stats[2],
                            // specialAttack: singlePokemon.stats[3],
                            // specialDefense: singlePokemon.stats[4],
                            // speed: singlePokemon.stats[5],
                            // type_1: singlePokemon.types[0],
                            // type_2: singlePokemon.type[1],
                        })
                        // console.log("searching", singlePokemon.data.abilities)
                        console.log("newPokemon", newPokemon)
                        })
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
