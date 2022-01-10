const Card = require("../models/card");

const router = require("express").Router();

// Create Item
router.post("/card",async (req, res) => {
    try{
        const card = new Card(req.body);
        await card.save();
        res.send(card);
    }catch(e){
        console.log(e)
    }
});

// Read Item
router.get("/card/:id",async (req, res) => {
    try{
        const card = await Card.findById(req.params.id);
        if(!card)return res.status(404).send({message: "Invalid Id"});
        res.send(card);
    }catch(e){
        console.log(e)
    }
});

// Read card(user)
router.get("/cards",async (req, res) => {
    try{
        const cards = await Card.find().sort({birth_date: -1});
        res.send(cards);
    }catch(e){
        console.log(e)
    }
});

module.exports = router;
