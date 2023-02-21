const objectMapper = require("./utils/objectMapper");

class Listener {
  #playlistsService;
  #mailSender;

  constructor(playlistsService, mailSender) {
    this.#playlistsService = playlistsService;
    this.#mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());

      const playlist = await this.#playlistsService.getPlaylistById(playlistId);
      const exportedPlaylist = objectMapper(playlist);
      console.log('exported-playlist :', exportedPlaylist);
      const result = await this.#mailSender.sendEmail(targetEmail, exportedPlaylist);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
