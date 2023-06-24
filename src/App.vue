<template>
  <div class="h-screen flex flex-col items-center p-4">
    <SearchBar @submit="handleSubmit" @reset="handleReset" />

    <!-- <div id="embed-iframe"></div> -->

    <TheLoading
      v-if="loading"
      class="flex-1 flex w-full h-full items-center justify-center"
    />
    <TheLyrics v-else-if="!loading && lyrics" :lines="lyrics.lines" />
  </div>
</template>
<script setup>
import { ref } from "vue";

import TranspilerService from "./services/transpiler/transpiler.js";

import SearchBar from "./components/SearchBar/SearchBar.vue";
import TheLyrics from "./components/TheLyrics/TheLyrics.vue";
import TheLoading from "./components/TheLoading.vue";

import LyricsAPIService from "./services/lyricsAPI.js";

const loading = ref(false);
const lyrics = ref(null);
const embedController = ref(null);

const handleReset = () => {
  lyrics.value = null;
  console.log(lyrics);
};

const handleSubmit = async (url) => {
  loading.value = true;

  url =
    "https://open.spotify.com/track/5rPnv4gceOGKCqbN06F2aJ?si=d820ada477d44684";

  // const [_, trackId] = new URL(url).pathname.split("/").filter((e) => !!e);

  // createMusic(trackId);

  const rawLyrics = await LyricsAPIService.getLyricsBySongUrl(url);

  lyrics.value = { lines: TranspilerService.transpileLyrics(rawLyrics) };

  loading.value = false;
};

const createMusic = (trackId) => {
  let recaptchaScript = document.createElement("script");
  recaptchaScript.setAttribute(
    "src",
    "https://open.spotify.com/embed-podcast/iframe-api/v1"
  );
  document.head.appendChild(recaptchaScript);

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById("embed-iframe");
    let options = {
      uri: "spotify:track:" + trackId,
    };
    let callback = (EmbedController) => {
      embedController.value = EmbedController;

      document.addEventListener("click", () => {
        EmbedController.play();
      });

      EmbedController.addListener("playback_update", (e) => {
        console.log({
          position: e.data.position,
        });
      });
    };

    IFrameAPI.createController(element, options, callback);
  };
};
</script>
