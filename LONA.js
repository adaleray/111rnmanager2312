const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

client.commands = new Map();
client.aliases = new Map();
client.events = new Map();

global.client = client;
require("./data/functions.js")({client: client, cfg: cfg});
require("./data/load.js")({fs: fs, client: client});
require("./data/commandHandler.js")({fs: fs, client: client});

client.login(cfg.qwe);