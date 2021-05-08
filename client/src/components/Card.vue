<template>
  <div class="container">
    <div class="card-content-section">
      <div class="card-content-section-title">Power up your memory</div>
      <div class="cards">
        <div class="card" @click="flip($event)">
        <div class="front">
          <span>Front</span>
        </div>
        <div class="back">
          <span>Back</span>
        </div>
        </div>

        <div class="card" @click="flip($event)">
        <div class="front">
          <span>Front</span>
        </div>
        <div class="back">
          <span>Back</span>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {},

  methods: {
    flip(event) {
      const element = event.currentTarget;
      if(element.className === "card") {
          element.style.transform = "rotateY(180deg)";
      }
    }
  }
};
</script>

<style scoped lang="scss">

.container {
 background-color: rgba(16, 18, 27, 0.4);
 max-width: 1250px;
 max-height: 860px;
 height: 80vh;
 display: flex;
 flex-direction: column;
 overflow: hidden;
 width: 100%;
 border-radius: 14px;
 backdrop-filter: blur(20px);
 -webkit-backdrop-filter: blur(20px);
 padding-left: 60px;
}

.card-content-section {
 margin-top: 30px;
 display: flex;
 flex-direction: column;
 padding: 0px 20px;

 &-title {
  color: white;
  margin-bottom: 14px;
  margin-top: 50px;
 }
}

.cards {
 display: flex;
 align-items: center;
 flex-wrap: wrap;
 justify-content: space-evenly;
}

.card {
 display: flex;
 flex-direction: column;
 width: 100px;
 height: 150px;
 font-size: 16px;
 background-color: rgba(146, 151, 179, 13%);
 border-radius: 14px;
 border: 1px solid rgba(16, 18, 27, 40%);
 padding: 60px 35px;
 cursor: pointer;
 transition: 0.3s ease;
 transition: transform 1s;
 transform-style: preserve-3d;
 margin-right: 80px;
 margin-top: 20px;

 &:hover {
  transform: scale(1.02);
  background-color: rgba(16, 18, 27, 0.4);
  color: white;
 }

 span {
  display: flex;
  align-items: center;
 }

 @media screen and (max-width: 1110px) {
  width: calc(50% - 20px);
  &:last-child {
   margin-top: 20px;
   margin-left: 0px;
  }
 }
 @media screen and (max-width: 565px) {
  width: calc(100% - 20px);
  margin-top: 20px;
  & + .card {
   margin-left: 0;
  }
 }
}

.front, .back {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
</style>
