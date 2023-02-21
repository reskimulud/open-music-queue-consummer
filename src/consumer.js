require('dotenv').config();

const amqp = require('amqplib');
const { Pool } = require('pg');
const Listener = require('./listener');
const MailSender = require('./services/MailSender');
const PlaylistsService = require('./services/PlaylistsService');


const init = async () => {
  const pool = new Pool();
  const playlistsService = new PlaylistsService(pool);
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();
