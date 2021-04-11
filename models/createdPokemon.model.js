const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const createdPokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 8
    },
    nickname: {
        type: String,
    },
    level: {
        type: Integer,
    },
    hp: {
        type: Integer,
    },
    attack: {
        type: Integer,
    },
    defense: {
        type: Integer,
    },
    specialAttack: {
        type: Integer,
    },
    specialDefense: {
        type: Integer,
    },
    speed: {
        type: Integer,
    },
    gMax?: {
        type: Boolean,
    },
    shiny?: {
        type: Boolean,
    },
    marks: {
        type: String,
    },
    moves_1: {
        type:String
    },
    moves_2: {
        type:String
    },
    moves_3: {
        type:String
    },
    moves_4: {
        type:String
    }

}, {
    timestamps: true,
})

const CreatedPokemon = mongoose.model('CreatedPokemon', createdPokemonSchema);

module.exports = CreatedPokemon;
