const slack = require('slack');
const random = require('random');

const channel = process.env.SLACK_ROOM;
const token = process.env.SLACK_TOKEN;

const generateMessage = (user) => `
  BOOM BOOM BOOM LET ME HEAR YOU SAY WAYWO, WAYWO! Who’s up you ask?! <@${user}> is up! Show us what you’re working on!
`;

exports.handler = (event, context, callback) => {
  slack.channels.info({
    channel,
    token
  }).then((res) => {
    const members = res.channel.members;
    const randomIndex = random.int(min = 0, max = members.length);
    return res.channel.members[randomIndex];
  })
  .then((user) => slack.chat.postMessage({token, channel, text: generateMessage(user)}))
  .then(callback);
}