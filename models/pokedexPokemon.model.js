const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokedexPokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
    },
    attack: {
        type: Number,
    },
    defense: {
        type: Number,
    },
    specialAttack: {
        type: Number,
    },
    specialDefense: {
        type: Number,
    },
    speed: {
        type: Number,
    },
    move_pool: {
        type: String
    },
    ability_1: {
        type:String
    },
    ability_2: {
        type:String
    },
    hidden_ability: {
        type:String
    },
    dex: {
        type: Number,
    },
    type_1: {
        type:String
    },
    type_2: {
        type:String
    }

}, {
    timestamps: true,
})

const PokedexPokemon = mongoose.model('PokedexPokemon', pokedexPokemonSchema);

module.exports = PokedexPokemon;
