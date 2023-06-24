import axios from "axios";

class LyricsAPIService {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://spotify-lyric-api.herokuapp.com",
    });
  }

  async getLyricsBySongUrl(songUrl) {
    return this._short(
      await this.instance.get("", { params: { url: songUrl } })
    );
  }

  _short(response) {
    return response.data;
  }
}

export default new LyricsAPIService();
