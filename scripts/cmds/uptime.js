module.exports = {
  config: {
    name: "𝓣𝓗𝓘𝓢 𝓘𝓢 𝓤𝓟𝓣𝓘𝓜𝓔 𝓒𝓜𝓓 💥",
    aliases: ["up", "upt"],
    version: "1.0",
    author: "Shinpei",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "System",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours} hours ${minutes} minutes ${seconds} second ]})`;
    api.sendMessage(`
𝐇𝐎𝐖 𝐌𝐔𝐂𝐇 𝐁𝐎𝐓 𝐈𝐒  𝐑𝐔𝐍𝐍𝐈𝐍𝐆🏃💨💨

 💋 [ 𝑼𝑷𝑻𝑰𝑴𝑬]  𝙃𝙀𝙇𝙇𝙊 𝙎𝙀𝙉𝙋𝘼𝙄 
𝑰 𝑨𝑴 𝑹𝑼𝑵𝑵𝑰𝑵𝑮 𝑭𝑹𝑶𝑴 💙 ({[${uptimeString}.`, event.threadID);
  }
};
