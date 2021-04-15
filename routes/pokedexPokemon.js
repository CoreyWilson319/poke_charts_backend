const router = require("express").Router();
const auth = require("../middleware/auth");
const axios = require("axios");
let Pokemon = require("../models/pokedexPokemon.model");

// POST
// ADD POKEMON TO POKEDEX DATABASE
// ONLY NEEDS TO BE RAN ONCE TO FILL DB
router.get("/seed",  async (req, res) => {
    try {

        async function seedData(link){

            let allPokemon = await axios.get(link)
            allPokemon = await allPokemon
            allPokemon.data.results.forEach(pokemon => {
                axios.get(pokemon.url)
                .then((singlePokemon) => {
                    // DEFINE HELPER FUNCTIONS HERE
                    function abilities(pokemonModel){
                        singlePokemon.data.abilities.forEach(abilitySlot => {
                            if (abilitySlot.slot == 1){
                                pokemonModel.ability_1 = abilitySlot.ability.name
                            }
                            else if (abilitySlot.slot === 2){
                                pokemonModel.ability_2 = abilitySlot.ability.name
                            }
                            else if (abilitySlot.is_hidden === true){
                                pokemonModel.hidden_ability = abilitySlot.ability.name
                            }
                        });
                    };
                    function moves(pokemonModel){
                        singlePokemon.data.moves.forEach(move => {
                            pokemonModel.move_pool.push(move.move.name)
                        })
                    }
                    function stats(pokemonModel){
                        singlePokemon.data.stats.forEach(stat => {
                            if (stat.stat.name == 'hp'){
                                pokemonModel.hp = stat.base_stat
                            }
                            else if (stat.stat.name == 'attack'){
                                pokemonModel.attack = stat.base_stat
                            }
                            else if (stat.stat.name == 'defense'){
                                pokemonModel.defense = stat.base_stat
                            }
                            else if (stat.stat.name == 'special-attack'){
                                pokemonModel.special_attack = stat.base_stat
                            }
                            else if (stat.stat.name == 'special-defense'){
                                pokemonModel.special_defense = stat.base_stat
                            }
                            else if (stat.stat.name == 'speed'){
                                pokemonModel.speed = stat.base_stat
                            }
                        })
                    }
                    // FILL DATA HERE
                    Pokemon.findOne({ dex: singlePokemon.id }).then((poke) => {
                        const newPokemon = new Pokemon({
                            name: singlePokemon.data.name,
                            dex: singlePokemon.data.id,
                        })
                        // Call helper functions here
                        abilities(newPokemon)
                        moves(newPokemon)
                        stats(newPokemon)

                        // Save Model to database
                        newPokemon.save()
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
router.get("/", async (req, res) => {
    try {
        let found_mons = await Pokemon.find()
        res.status(200).json(found_mons)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

// GET 'pokedex/:name'
// SHOW SINGLE POKEMON BY DEX NUMBER (ID)
router.get("/:name", async (req, res) => {
    try {
        let found_mon = await Pokemon.find({'name': req.params.name})
        res.status(200).json(found_mon)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router;
