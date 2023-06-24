<template>
  <div class="h-screen flex flex-col items-center p-4">
    <SearchBar @submit="handleSubmit" />

    <!-- <div id="embed-iframe"></div> -->

    <TheLoading
      v-if="loading"
      class="flex-1 flex w-full h-full items-center justify-center"
    />
    <TheLyrics v-else-if="!loading && lyrics" :lines="lyrics.lines" />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

import SearchBar from "./components/SearchBar/SearchBar.vue";
import TheLyrics from "./components/TheLyrics/TheLyrics.vue";
import TheLoading from "./components/TheLoading.vue";

import LyricsAPIService from "./services/api/lyricsAPI.service";

const loading = ref(false);
const lyrics = ref(null);
const embedController = ref(null);

const handleSubmit = async (url) => {
  loading.value = true;

  const test = new URL(url);

  const [_, track] = test.pathname.split("/").filter((e) => !!e);

  createMusic(track);

  lyrics.value = await LyricsAPIService.getLyricsBySongUrl(url);

  loading.value = false;
};

const createMusic = (track) => {
  let recaptchaScript = document.createElement("script");
  recaptchaScript.setAttribute(
    "src",
    "https://open.spotify.com/embed-podcast/iframe-api/v1"
  );
  document.head.appendChild(recaptchaScript);

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById("embed-iframe");
    let options = {
      uri: "spotify:track:" + track,
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
