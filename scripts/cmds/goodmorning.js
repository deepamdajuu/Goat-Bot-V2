module.exports = {
  config: {
    name: "goodmorning",
    aliases: ["morning", "greetings"],
    author: "Hassan-",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says good morning  to the user."
    },
    longDescription: {
      en: "Responds with a greeting to the user invoking the command."
    },
    category: "general",
    guide: {
      en: "Just use the command and the bot will greet you!"
    }
  },
  event: null,
  onStart: async function ({ api, event }) {
    api.sendMessage("gud morning✨💐?", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "good morning" || event.body.toLowerCase() === "morning")) {
      message.reply("Good morning have a nice day🌅");
    }
  }
};
