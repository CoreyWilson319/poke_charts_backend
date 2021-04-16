const router = require("express").Router();
const auth = require("../middleware/auth");
const { route } = require("./user");
let Pokemon = require("../models/createdPokemon.model");
let User = require("../models/user.model");

// POST 'create'
// Create a pokemon and save it to user
// PRIVATE
router.post("/new", auth, async (req, res) => {

    try
    {    
        const newPokemon = new Pokemon({
            name: req.body.name,
            nickname: req.body.nickname,
            level: req.body.level,
            hp_iv: req.body.hp_iv,
            attack_iv: req.body.attack_iv,
            defense_iv: req.body.defense_iv,
            special_attack_iv: req.body.special_attack_iv,
            special_defense_iv: req.body.special_defense_iv,
            speed_iv: req.body.speed_iv,
            hp_ev: req.body.hp_ev,
            attack_ev: req.body.attack_ev,
            defense_ev: req.body.defense_ev,
            special_attack_ev: req.body.special_attack_ev,
            special_defense_ev: req.body.special_defense_ev,
            speed_ev: req.body.speed_ev,
            gMax: req.body.gMax,
            shiny: req.body.shiny,
            marks: req.body.marks,
            moves_1: req.body.moves_1,
            moves_2: req.body.moves_2,
            moves_3: req.body.moves_3,
            moves_4: req.body.moves_4,
            user_id: req.user.id
        })
        User.findOne({_id: req.user.id}).then((creating_user) => {
            newPokemon.save()
            creating_user.pokemon.push(newPokemon)
            creating_user.save()
        })
        res.status(200).json({newPokemon})
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

// DELETE 'delete/:id'
// REMOVE A POKEMON FROM THE DATABASE
// PRIVATE
router.delete("/:id/delete", auth, async (req, res) => {
    try {
        pokemon_to_delete = await Pokemon.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "Pokemon deleted"})

    } catch(err) {
        res.status(400).json({msg: err})
    }
})

// PUT 'update/:id'
// UPDATE A POKEMON A USER HAS CREATED
// PRIVATE
router.put("/:id/update", auth, async (req, res) => {
    try {
        pokemon_to_update = await Pokemon.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                nickname: req.body.nickname,
                level: req.body.level,
                hp_iv: req.body.hp_iv,
                attack_iv: req.body.attack_iv,
                defense_iv: req.body.defense_iv,
                special_attack_iv: req.body.special_attack_iv,
                special_defense_iv: req.body.special_defense_iv,
                speed_iv: req.body.speed_iv,
                hp_ev: req.body.hp_ev,
                attack_ev: req.body.attack_ev,
                defense_ev: req.body.defense_ev,
                special_attack_ev: req.body.special_attack_ev,
                special_defense_ev: req.body.special_defense_ev,
                speed_ev: req.body.speed_ev,
                gMax: req.body.gMax,
                shiny: req.body.shiny,
                marks: req.body.marks,
                moves_1: req.body.moves_1,
                moves_2: req.body.moves_2,
                moves_3: req.body.moves_3,
                moves_4: req.body.moves_4,
            })
        res.status(200).json({msg: "Pokemon updated"})

    } catch(err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router;
