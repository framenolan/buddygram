const express = require('express');
const router = express.Router();
const {User, Vite, Comment} = require('../models');

// Explore Vites
router.get("/", (req, res) => {
    if(!req.session.user){
        return res.redirect("/login")
    }
    
    Vite.findAll()
    .then(allVites => {
        const hbsVites = allVites.map(vite => vite.get({plain: true}));
        console.log(hbsVites)
        const loggedIn = req.session.user?true:false;
        console.log("loggedIn = ", loggedIn)
        // res.render(
        //     // TODO: render the explore feed here
        // )
    })
})

// Login
router.get("/login", (req, res) => {
    if(req.session.user) {
        return res.redirect("/profile")
    }
    res.render("login")
})


// Signup


// Profile Page
router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Vite]
    }).then(userData=>{
        const hbsData = userData.get({plain:true})
        // TODO: To remove later....
        console.log(hbsData);
        hbsData.loggedIn = req.session.user?true:false
        res.render("profile",hbsData)
    })
})


module.exports = router;