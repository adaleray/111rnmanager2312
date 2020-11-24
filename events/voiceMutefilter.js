module.exports.help = { name: "voiceStateUpdate" };

module.exports.event = (oldState, newState, db = require("quick.db")) => {
  if((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)) {
    let data = db.get("tempsmute") || [{id: null, kalkmaZamani: null}];
    let member = newState.member;
    if(!member) return;
    if (data.some(d => d.id == member.id)){
      let d = data.find(x => x.id == member.id);
      if(Date.now() >= d.kalkmaZamani){
        data = data.filter(d => d.id != member.id);
        member.roles.remove("721069802784948247");
        uye.voice.setMute(false)
        cdb.set("tempsmute", data);
      } else if(member.voice.channel && !member.voice.serverMute){
        member.roles.add("721069802784948247");
        uye.voice.setMute(true)
      }
    }
  }
};