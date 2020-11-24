const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

client.commands = new Map();
client.aliases = new Map();
client.cezalilar = new Set();
client.cmuteliler = new Set();
client.locked = new Set();
global.client = client;

require("./beko/functions.js")(client, cfg);
require("./beko/load.js")(fs, client);
require("./beko/commandHandler.js")(fs, client);
require("./beko/login.js")(client, cfg);

/*var x = [{
  id: "x",
  teyit: 10
},
{
  id: "x",
  teyit: 30
}];

var y = Object.keys(x);
var z = x.sort((a, b) => b.teyit - a.teyit)
z.map((value, index) => console.log(index + 1+".", value.teyit));*/