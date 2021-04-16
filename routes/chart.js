const router = require("express").Router();
const auth = require("../middleware/auth");
let Pokemon = require("../models/createdPokemon.model");
let User = require("../models/user.model");

// GET 'chart'
// SHOW ALL USER GENERATED POKEMON
// PRIVATE
router.get("/", auth, (req, res) => {
    try {
        Pokemon.find({user_id: req.user.id}).then((chart_mons) =>{
            res.status(200).json(chart_mons)
        })
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

// GET 'chart/:id'
// SHOW INDIVIDUAL INFO OF CREATED POKEMON
// PRIVATE
router.get("/:id", auth, (req, res) => {
    try {
        Pokemon.find({ _id: req.params.id}).then((chart_mon) => {
            if (chart_mon.user_id != req.user.id){
                User.find({ _id:chart_mon.user_id}).then((found_user) => {
                    if (found_user.public) {
                        res.status(200).json(chart_mon)
                    } else {
                        res.status(400).json({msg: "The person who owns this Pokemon has their settings set to not be Public"})
                    }
                })
            }

        })
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router;