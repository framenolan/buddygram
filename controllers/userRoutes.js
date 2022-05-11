const express = require("express");
const router = express.Router();
const { User, Vite } = require('../models/')
const bcrypt = require("bcrypt");

// find all
router.get("/", (req, res) => {
  User.findAll({
    include: [Vite]
  })
    .then(dbUsers => {
      res.json(dbUsers)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login")
})

// find one
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then(dbUser => {
      res.json(dbUser)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// create user
router.post("/", (req, res) => {
  User.create(req.body)
    .then(newUser => {
      req.session.user = {
        id: newUser.id,
        email: newUser.email
      }
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      // alert("An error occurred\n", err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// login user
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(foundUser => {
    // TODO: Remove later
    console.log("uR 62")
    console.log(foundUser)
    if (!foundUser) {
      console.log("uR 65")
      return res.status(400).json({ msg: "Incorrect Email or Password" })
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log("uR 69")
      req.session.user = {
        id: foundUser.id,
        email: foundUser.email
      }
      return res.json(foundUser)
    } else {
      console.log("uR 76")
      return res.status(400).json({ msg: "Incorrect Email or Password" })
    }
  }).catch(err => {
    console.log("uR 80")
    // alert("An error occurred\n", err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//update user
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedUser => {
    res.json(updatedUser);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//delete user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(delUser => {
    res.json(delUser);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});


module.exports = router;