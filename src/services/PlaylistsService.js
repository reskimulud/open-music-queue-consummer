class PlaylistsService {
  #pool;

  constructor(pool) {
    this.#pool = pool;
  }

  async getPlaylistById(id) {
    console.log('getPlaylistById dijalankan');
    console.log('id :', id);
    const queryPlaylist = {
      text: `SELECT playlist.id, playlist.name, users.username FROM playlist
      LEFT JOIN users ON playlist.owner = users.id
      WHERE playlist.id = $1`,
      values: [id],
    };

    const playlist = await this.#pool.query(queryPlaylist);

    if (!playlist.rowCount) {
      throw new Error('Playlist not found');
    }

    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM songs JOIN songlists
      ON songlists.song_id = songs.id
      WHERE songlists.playlist_id = $1`,
      values: [playlist.rows[0].id],
    };

    const songs = await this.#pool.query(querySongs);

    return {
      ...playlist.rows[0],
      songs: songs.rows,
    };
  }
}

module.exports = PlaylistsService;
