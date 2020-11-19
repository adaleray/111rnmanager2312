const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");


fs.readdir("./komutlar/", (err, files, komutlar = []) => {
  if (err) return console.log(err);
  files.filter(f => f.endsWith(".js")).forEach(file => {
    const prop = require(`./komutlar/${file}`);
  });
});