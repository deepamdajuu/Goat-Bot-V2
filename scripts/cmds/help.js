const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete ="「 🐐 | Nemo Bot 」";
/** 
* @author NTKhang
* @author: do not delete it
* @message if you delete or edit it you will get a global ban
*/

module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "NTK",
    countDown: 20,
    role: 0,
    shortDescription: {
      vi: "Xem cách dùng lệnh",
      en: "View command usage"
    },
    longDescription: {
      vi: "Xem cách sử dụng của các lệnh",
      en: "View command usage"
    },
    category: "info",
    guide: {
      en: "{pn} [empty | <page number> | <command name>]"
        + "\n   {pn} <command name> [-u | usage | -g | guide]: only show command usage"
        + "\n   {pn} <command name> [-i | info]: only show command info"
        + "\n   {pn} <command name> [-r | role]: only show command role"
        + "\n   {pn} <command name> [-a | alias]: only show command alias"
    },
    priority: 1
  },

  langs: {
    en: {			help: 
      `╭───✧XITU
│✿︎ ai ✿︎ xitu 
│✿︎ art ✿︎ gpt
│✿︎ imagine ✿︎ des
│✿︎ sdxl ✿︎ prodia
│✿︎ gen ✿︎ nai
│✿︎ prompt
╰───────────❀
╭───❀『 HORNY 』
│✿︎ nsfw ✿︎ nemo2
│✿︎ baby ✿︎ hentai
│✿ nude ✿ redroom
│✿ hentai2 ✿ nek
╰───────────❀
╭───❀『 CONFIG 』
│✿︎ admin ✿︎ cmd
│✿︎ help ✿︎ restart
│✿︎ eval ✿︎ file
│✿︎ clear ✿︎ paste
│✿︎ d  ✿︎ enc2
│✿︎ ocr ✿︎ uid
│✿︎ translate 
│✿︎ fuser ✿︎ count
│✿︎ a  ✿︎ leaveall
│✿︎ aban  
╰───────────❀
╭───❀『 OTHERS 』 
│✿︎ fb ✿︎ videofb 
│✿︎ tik ✿︎ stats
│✿ sing ✿ insta
│✿ tik ✿︎ say
│✿ sim ✿︎ jeevan
╰───────────❀
╭───❀『 GAMES 』
│✿︎ emojimix ✿︎ slot
│✿︎ sicbo ✿︎ item
│✿︎ bank ✿︎ topexp
│✿︎ country ✿︎ bal
│✿︎ memories ✿︎ ttt
│✿︎ quiz ✿︎ quiz2
│✿︎ choose ✿︎ daily
│✿︎ emoji 
╰───────────❀
╭──❀『✰𝐃𝐀𝐃𝐃𝐘✰😉』
│Thanks for using 🤍
│Total cmds:[ %4 ].
│Type help cmds to
│learn usage 🌸
╰───────────❀
╭───❀
│𝐊𝐒𝐇𝐈𝐓𝐈𝐙 𝐃𝐀𝐃𝐃𝐘 ♡︎
╰────────────❀`,

      help2: "%1◊\n│ » Currently, the bot has %2 commands that can be used\n│ » Total Cmds: %3 \n│ %4\n╰─────────────◊",
      commandNotFound: "Command \"%1\" does not exist",
      getInfoCommand: "◊ ─── NAME ──── ◊\n » %1\n◊ ─── INFO ─── ◊\n » Author: %8\n » Description: %2\n\◊ ─── Usage ─── ◊\n%9\n◊───────◊",
      onlyInfo: "◊── INFO ────◊\n│ Command name: %1\n│ Description: %2\n│ Other names: %3\n│ Other names in your group: %4\n│ Version: %5\n│ Role: %6\n│ Time per command: %7s\n│ Author: %8\n◊─────────────◊",
      onlyUsage: "◊── USAGE ────◊\n│%1\n✧─────────────◊",
      onlyAlias: "◊── ALIAS ────◊\n│ Other names: %1\n│ Other names in your group: %2\n◊─────────────◊",
      onlyRole: "◊── ROLE ────◊\n│%1\n◊─────────────◊",
      doNotHave: "Do not have",
      roleText0: "0 (All users)",
      roleText1: "1 (Group administrators)",
      roleText2: "2 (Admin bot)",
      roleText0setRole: "0 (set role, all users)",
      roleText1setRole: "1 (set role, group administrators)",
      pageNotFound: "Page %1 does not exist"
    }
  },

  onStart: async function ({ message, args, event, threadsData, getLang, role }) {
    const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
    let customLang = {};
    const pathCustomLang = path.join(__dirname, "..", "..", "languages", "cmds", `${langCode}.js`);
    if (fs.existsSync(pathCustomLang))
      customLang = require(pathCustomLang);
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);
    let sortHelp = threadData.settings.sortHelp || "name";
    if (!["category", "name"].includes(sortHelp))
      sortHelp = "name";
    const commandName = (args[0] || "").toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));
    // ———————————————— LIST ALL COMMAND ——————————————— //
    if (!command && !args[0] || !isNaN(args[0])) {
      const arrayInfo = [];
      let msg = "";
      if (sortHelp == "name") {
        const page = parseInt(args[0]) || 1;
        const numberOfOnePage = 30;
        for (const [name, value] of commands) {
          if (value.config.role > 1 && role < value.config.role)
            continue;
          let describe = name;
          let shortDescription;
          const shortDescriptionCustomLang = customLang[name]?.shortDescription;
          if (shortDescriptionCustomLang != undefined)
            shortDescription = checkLangObject(shortDescriptionCustomLang, langCode);
          else if (value.config.shortDescription)
            shortDescription = checkLangObject(value.config.shortDescription, langCode);
          if (shortDescription)
            describe += `: ${cropContent(shortDescription.charAt(0).toUpperCase() + shortDescription.slice(1))}`;
          arrayInfo.push({
            data: describe,
            priority: value.priority || 0
          });
        }
        arrayInfo.sort((a, b)
