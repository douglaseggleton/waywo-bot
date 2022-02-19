const { App } = require("@slack/bolt");
const random = require("random");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const generateMessage = (user) => `
  BOOM BOOM BOOM Let me hear you say WAYWO... WAYWO! <@${user}>, show us what you’re working on!
`;

exports.handler = async () => {
  const botId = await (await app.client.users.profile.get()).profile["bot_id"];
  const profile = await app.client.bots.info({ bot: botId });
  const userId = profile.bot["user_id"];

  const channel = await app.client.conversations
    .list()
    .then((list) =>
      list.channels.find(
        (channel) => channel.name === process.env.SLACK_CHANNEL
      )
    );

  const members = await (
    await app.client.conversations.members({ channel: channel.id })
  ).members.filter((member) => member !== userId);

  const randomIndex = random.int(0, members.length - 1);
  const user = members[randomIndex];

  app.client.chat.postMessage({
    channel: channel.id,
    text: generateMessage(user),
  });
};
