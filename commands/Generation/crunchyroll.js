const usedCommandRecently4 = require('/app/server').cooldown;
let fs = require('fs');

module.exports = class Crunchyroll extends require('../CommandHandler') {
  constructor() {
    super("crunchyroll");
  }
  
  command() {
    return {
      aliases: ["gencrunchyroll"],
      usage: "/"+this.name,
      arguments() {
        return {
          minArgs: 0,
          maxArgs: 0
        }
      },
      permissions() {
        return [];
      },
      run(client, msg, args) {
        const Discord = require('discord.js');
        let message = msg;
        if (usedCommandRecently4.has(message.author.id)){
        message.channel.send(require('/app/util').cooldown(Discord))
    } else{
        usedCommandRecently4.add(message.author.id)
        setTimeout(() =>{
            usedCommandRecently4.delete(message.author.id);
        }, 300000) //300000
    var string = fs.readFileSync('./accounts/crunchyroll.txt', 'utf-8');
    if(string.length < 1)return msg.channel.send(new Discord.RichEmbed().setColor('RED').setDescription('Cuentas agotadas. Checker Crunchyroll Checkeando....'));
    message.channel.send(require('/app/util').account(client));
    var words = string.split('\n');
    let random = words[Math.floor(Math.random()*words.length)];
    let cuenta = random.split(':');
    let emb = new Discord.RichEmbed()
    .setTitle('__Crunchyroll__')
    .setColor('Orange')
    //.setFooter('Developed by: '+client.users.get('6761139184
    .setFooter('Developed by DenSiTyMoDzZ#9081')
    .setDescription('**Correo**: '+cuenta[0]+'\n**Contraseña**: '+cuenta[1]+'\n\nCuenta entregada!')
    msg.member.send(emb);
     }
      }
    }
  }
  
}
