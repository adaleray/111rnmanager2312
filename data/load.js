module.exports = ({fs, client, cfg}) => {
  fs.readdir("./events/", (err, files, events = []) => {
    if (err) return console.log(err);
    console.log("--------------------------");
    console.log("Eventler yükleniyor.");
    files.filter(f => f.endsWith(".js")).forEach(file => {
      let prop = require(`../events/${file}`);
      client.events.set(prop.help.name, prop);
    });
    for (var value of client.events.values()) events.push(value.help.name);
    console.log("[" + events.join(", ") + "] " +  " isimli event(ler) yüklendi.");
    console.log("--------------------------");
    console.log(client.events.values());
  });
};