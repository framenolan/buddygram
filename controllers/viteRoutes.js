const express = require("express");
const router = express.Router();
const { User, Vite } = require("../models");

//find all
router.get("/", (req, res) => {
  Vite.findAll({})
    .then(dbVites => {
      res.json(dbVites);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one
router.get("/:id", (req, res) => {
  Vite.findByPk(req.params.id, {})
    .then(dbVite => {
      res.json(dbVite);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// create Vite
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("./login")
    // return res.status(401).json({ msg: "Please login to view" })
  }

  Vite.create({
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
    details: req.body.details,
    capacity: req.body.capacity,
    userId:req.session.user.id
  })
    .then(newVite => {
      res.json(newVite)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// update Vite
router.put("/:id", (req, res) => {
  Vite.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(updatedVite => {
      res.json(updatedVite)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// delete Vite
router.delete("/:id", (req, res) => {
  Vite.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(delVite => {
      res.json(delVite)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

module.exports = router