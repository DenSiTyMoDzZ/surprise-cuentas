module.exports = class CommandPrompt { // CopyRigth Atog/Deleted User/ 647594401203224586
  constructor(name) {
    this.name = name;
  }
  
  command() {
    return {
      aliases: [this.name],
      usage: "!"+this.name,
      arguments() {
        return {
          minArgs: 0,
          maxArgs: -1
        }
      },
      permissions() {
        return [];
      },
      run(client, msg, args) {
        throw new Error("Please, add run(Class, Variable, String[]) to your command");
      }
    }
  }
  
  proccessCommand(client, msg) {
    const Discord = require('discord.js');
    const err = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(":x: Error, estamos actualizando el bot en estos momentos, intentelo mas tarde, Gracias!");
	let alias = '';
	if(this.command().aliases.length < 1) {
		alias = 'No aliases detected';
	}else{
		alias = this.command().aliases.join(', ');
	}
    let usage = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(':warning: Correct Usage: **'+this.command().usage+'**\nAliases: `'+alias+'`')
    let permissed = true;
    let args = msg.content.split(' ').slice(1);
    this.command().permissions().forEach(permission => {if(permission.trim() != ""){permissed = msg.member.hasPermission(permission.toUpperCase());}});
    if(permissed) {
      if((this.command().arguments().maxArgs == -1 ? false : args.length > this.command().arguments().maxArgs) || args.length < this.command().arguments().minArgs) return msg.channel.send(usage);
      this.command().run(client, msg, args);
    }else{
      msg.channel.send(err);
    }
  }
  
  commandName() {
    return this.name;
  }
}
