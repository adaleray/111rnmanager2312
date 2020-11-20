const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

global.client = client;
client.commands = new Map();
client.aliases = new Map();

require("./data/functions.js")(client, cfg);
require("./data/load.js")(fs, client);
require("./data/commandHandler.js")(fs, client);
require("./data/login.js")(client, cfg);
