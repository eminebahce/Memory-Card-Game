<template>
  <div id="app">
    <div class="container">
      <Game />
    </div>
  </div>
</template>

<script>
import Game from "./components/Game.vue";

export default {
  name: "App",
  components: {
    Game,
  },

};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  outline: none;
  box-sizing: border-box;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  background-image: url(https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-dark-wwdc-2020-5120x2880-1432.jpg);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;
  width: 100%;
  height: 100vh;

  @media (min-width: 320px) {
    background-size: 150% 100%;
    background-attachment: fixed;
    padding: 0.8em; 
  }

.container {
 background-color: rgba(16, 18, 27, 0.4);
 max-width: 1250px;
 max-height: 860px;
 display: flex;
 flex-direction: column;
 overflow: hidden;
 width: 100%;
 border-radius: 14px;
 backdrop-filter: blur(20px);
 -webkit-backdrop-filter: blur(20px);
 justify-content: center;
 align-items: center;
}
}
</style>
