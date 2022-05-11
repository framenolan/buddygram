const express = require('express');
const router = express.Router();
const { User, Vite, Comment } = require('../models');

// Explore Vites
router.get("/", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    Vite.findAll()
        .then(allVites => {
            const hbsVites = allVites.map(Vites => Vites.get({ plain: true }));
            // TODO: remove console logs
            console.log(hbsVites)
            const loggedIn = req.session.user ? true : false;
            console.log("loggedIn = ", loggedIn)
            res.render("explore")
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
})

// Login
router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile")
    }
    res.render("login")
})

// Signup
router.get("/signup", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile")
    }
    res.render("signup")
})

// Logout User
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
    location.reload();
})


// About Us
router.get("/aboutus", (req, res) => {
    
    res.render("aboutus");
})


// Profile Page
router.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    
    User.findByPk(req.session.user.id, {
        include: [Vite]
    }).then(userData => {
        const hbsData = userData.get({ plain: true })
        hbsData.loggedIn = req.session.user ? true : false
        console.log(hbsData)
        res.render("profile", hbsData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
})


module.exports = router;