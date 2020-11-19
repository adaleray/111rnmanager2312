module.exports = ({fs, client, cfg}) => {
  fs.readdir("./events/", (err, files, events = []) => {
    if (err) return console.log(err);
    console.log("--------------------------");
    console.log("Eventler yükleniyor.");
    files.filter(f => f.endsWith(".js")).forEach(file => {
      let prop = require(`../events/${file}`);
      client.on(prop.help.name, prop.event);
    });
    for (var value of client.events.values()) events.push(value.help.name);
    console.log("[" + events.join(", ") + "] " +  " isimli event(ler) yüklendi.");
    console.log("--------------------------");
  });
};