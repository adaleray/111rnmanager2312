module.exports.event = (
  oldUser,
  newUser,
  client = global.client,
  { roles, tag } = require("../config.json")
) => {};

class otoTag {
  consturctor(oldUser, newUser, client, roles, tag)
}

module.exports.help = { name: "userUpdate" };