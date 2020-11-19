const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

client.commands = new Map();
client.aliases = new Map();

require("./functions.js")({client: client, cfg: cfg});
require("./message.js")({client: client, cfg: cfg, fs: fs});