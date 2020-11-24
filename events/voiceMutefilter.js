module.exports.help = { name: "voiceStateUpdate" };

class VoiceMuteChecker {
  constructor(oldState, newState, db) {
    this.oldState = oldState;
    this.newState = newState;
    this.db = db;
  }
  check() {
    if ((!this.oldState.channel && this.newState.channel) || (this.oldState.channel && this.newState.channel)) {
      let vmuted = this.db.get(`vmute_${this.newState.guild.id}`) || [{id: null, kalkmaZamani: null}];
      let uye = this.newState.member;
      if (!uye) return null;
      if (vmuted.some(d => d.id == uye.id)){
        let d = vmuted.find(x => x.id == uye.id);
        if (Date.now() >= d.kalkmaZamani){
          vmuted = vmuted.filter(d => d.id != uye.id);
          uye.voice.setMute(false);
          this.db.set(`vmute_${this.newState.guild.id}`, vmuted);
        } else if (uye.voice.channel && !uye.voice.serverMute) {
          uye.voice.setMute(true);
        };
      };
    };
  }
}

module.exports.event = (oldState, newState, db = require("quick.db")) => new VoiceMuteChecker(oldState, newState, db).check();