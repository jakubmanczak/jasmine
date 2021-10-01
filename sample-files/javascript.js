/*
    Sample JavaScript code to show & test syntax highlighting.
    Taken from github.com/gractwo/bot
*/
const discordjs = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const cl = new discordjs.Client({
	intents: [
		discordjs.Intents.FLAGS.GUILDS,
		discordjs.Intents.FLAGS.GUILD_MESSAGES,
	],
});
cl.cfg = require('./cfg.json');
cl.cmds = new discordjs.Collection();

const cmdsFls = fs
	.readdirSync(`./src/cmds`)
	.filter((file) => file.endsWith(`.js`));
for (const Fl of cmdsFls) {
	const cmd = require(`./cmds/${Fl}`);
	console.log(`command: ` + cmd.name);
	cl.cmds.set(cmd.name, cmd);
}

cl.on('messageCreate', (msg) => {
	if (!msg.content.startsWith(cl.cfg.prefix) || msg.author.bot) return;

	const args = msg.content.slice(cl.cfg.prefix.length).trim().split(/ +/);
	const cmdName = args.shift().toLowerCase();

	if (!cl.cmds.has(cmdName)) return;
	const cmd = cl.cmds.get(cmdName);

	try {
		cmd.execute(cl, msg, args);
	} catch (error) {
		console.error(
			`msgCommand error: ${cmdName} with args ${args} by ${msg.author.tag}\n--\n${error}\n--`
		);
		msg.reply(
			`An error occured while trying to execute ${cmdName} with args ${args}`
		);
		return;
	}
	console.log(`msgCommand: ${cmdName + args} by ${msg.author.tag}`);
});

cl.once('ready', () => {
	console.clear();
	console.log(`bot ready; logged in as ${cl.user.tag}\n--`);
	cl.user.setActivity('.pomoc', { type: 'LISTENING' });
});

cl.login(process.env.token);
