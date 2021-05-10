<template>
  <div class="card-content-section">
    <div class="card-content-section-title">Power up your memory</div>
    <div v-if="randomNumbers.length == 0" class="card-content-section-title1">Please select a card size.</div>
    <div v-if="randomNumbers.length != 0  && !gameResult" class="card-content-section-title1">Order cards</div>
    <div v-if="randomNumbers.length != 0 && gameResult" class="card-content-section-title1">{{gameResult}}</div>
    <div class="cards" v-if="randomNumbers.length == 0">
      <div
        v-for="(element, index) in selection"
        class="card"
        @click="getCards(element)"
        :key="index"
      >
        <div class="front">
          <span>{{ element }}</span>
        </div>
      </div>
    </div>
    <div class="cards" v-else>
      <div
        v-for="(element, index) in randomNumbers"
        class="card"
        :id="'card' + index"
        @click="flip($event)"
        :key="index"
      >
        <div class="front">
          <span>{{ element }}</span>
        </div>
        <div class="back">
          <span></span>
        </div>
      </div>
    </div>
    <button class="content-button status-button">Restart game</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Card",
  data() {
    return {
      sortedNumbers: [],
      counter: 0,
    };
  },
  created() {
    this.$store.dispatch("getCardOffer");
  },
  computed: {
    ...mapState({
      selection: (state) => state.cardSelection.selection.selection,
      randomNumbers: (state) => state.numbers.randomNumbers,
      gameResult: (state) => state.results.gameResult
    }),
  },
  methods: {
    flip(event) {
      const element = event.currentTarget;
      element.style.transform = "rotateY(0deg)";
      const index = element.id.replace("card", "");

      if (this.randomNumbers[index] === this.sortedNumbers[this.counter]) {
        if (this.counter + 1 === this.sortedNumbers.length) {
          this.$store.dispatch("storeResult", {timeStamp: new Date(),numbers: this.randomNumbers, gameResult: "WIN"})
        } else {
          this.counter++;
        }
      } else {
        this.$store.dispatch("storeResult", {timeStamp: new Date(), numbers: this.randomNumbers, gameResult: "LOST"})
        this.counter = 0;
      }
      
    },
    getCards(numberOfCards) {
      this.$store
        .dispatch("getRandomNumber", numberOfCards)
        .then(() => {
          setTimeout(function() {
            for (let i = 0; i < numberOfCards; i++) {
              let cardElement = document.querySelector("#card" + i);
              cardElement.style.transform = "rotateY(180deg)";
            }
          }, 1500);
        }).then(() => {this.sortedNumbers = this.randomNumbers.slice().sort()});
    },
  },
};
</script>

<style scoped lang="scss">
.card-content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;

  &-title {
    color: white;
    margin-bottom: 40px;
    margin-top: 20px;
    margin-left: 230px;
  }

    &-title1 {
    color: white;
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
  padding: 60px 30px;
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

.front,
.back {
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

.content-button {
 background-color: #3a6df0;
 border: none;
 padding: 8px 26px;
 color: #fff;
 border-radius: 20px;
 margin-top: 16px;
 cursor: pointer;
 transition: 0.3s;
 white-space: nowrap;
 width: 130px;
 display: flex;
 align-items: center;
 margin-left: auto;
 margin-top: 16px;
}
</style>
