const db = require("../database/dbConfig.js");

module.exports = {
  getUsers,
  addUser,
  findUser
};

function getUsers() {
  return db("users");
}

function addUser(user) {
  return db("users").insert(user);
}

function findUser(filter) {
  return db("users").where(filter);
}
