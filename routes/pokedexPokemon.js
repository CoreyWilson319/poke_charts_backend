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
                            // console.log("stat", stat.stat.name)
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
                            // ability_1: '',
                            // ability_2: '',
                            // hidden_ability: '',
                            move_pool: [],
                            // hp: singlePokemon.data.stats[0],
                            // attack: singlePokemon.data.stats[1],
                            // defense: singlePokemon.data.stats[2],
                            // specialAttack: singlePokemon.data.stats[3],
                            // specialDefense: singlePokemon.data.stats[4],
                            // speed: singlePokemon.data.stats[5],
                            // type_1: singlePokemon.data.types[0],
                            // type_2: singlePokemon.data.type[1],
                        })
                        // Call helper functions here
                        abilities(newPokemon)
                        moves(newPokemon)
                        stats(newPokemon)

                        // Save Model to database



                        // console.log("searching", singlePokemon.data.stats)
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
