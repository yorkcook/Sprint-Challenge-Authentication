const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../jokes/jokes-model.js");
const secrets = require("../config/secrets.js");
const restricted = require("../auth/authenticate-middleware.js");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;

  Users.addUser(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500) / json({ message: "Failure to add the user." });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findUser({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwt(user);
        res.status(200).json({
          message: `Welcome, you have the keys to the kingdom ${user.username}`,
          token
        });
      } else {
        res
          .status(401)
          .json({ message: "You do not have the keys to the kingdom!!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "You done got smurfed!!" });
    });
});

router.get("/users", restricted, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "You need dat token!" });
    });
});

function getJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    jwtid: 1
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
