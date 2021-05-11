<template>
  <div class="card-content-section">
    <div class="card-content-section-title">Power up your memory</div>
    <div v-if="!gameStep" class="card-content-section-title">
      Please select the number of the cards
    </div>
    <div v-if="gameStep && !gameResult" class="card-content-section-title">
      Order cards
    </div>
    <div
      v-if="gameStep && gameResult == 'WIN'"
      class="card-content-section-title-win"
    >
      <h2>{{ gameResult }}</h2>
    </div>
    <div
      v-if="gameStep && gameResult == 'LOST'"
      class="card-content-section-title-lost"
    >
      <h2>{{ gameResult }}</h2>
    </div>
    <div class="cards" v-if="!gameStep">
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
        class="card active"
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
    <button
      v-if="gameResult"
      @click="reStart"
      class="content-button status-button"
    >
      Restart game
    </button>
    <button
      id="myBtn"
      v-if="gameResult"
      @click="openmodal()"
      class="content-button status-button"
    >
      Show history
    </button>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal()">×</span>
        <div v-for="(element, index) in history.history" :key="index">
          <div>
            <span class="modal-result-title">
              {{ index + 1 }}. game results:
            </span>
            <p>{{ element.timeStamp | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
            <p>{{ element.gameResult }}</p>
            <p>{{ element.numbers }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Card",
  data() {
    return {
      counter: 0,
      gameResult: "",
      numberOfCards: 0,
      gameStep: false,
    };
  },
  created() {
    this.$store.dispatch("getCardOffer");
  },
  computed: {
    ...mapState({
      selection: (state) => state.cardSelection.selection.selection,
      randomNumbers: (state) => state.numbers.randomNumbers,
      sortedNumbers: (state) => state.numbers.sortedNumbers,
      history: (state) => state.results.history,
    }),
  },
  methods: {
    flip(event) {
      if (this.gameResult == "") {
        const element = event.currentTarget;
        if (element.classList.value.includes("active")) {
          element.classList.remove("active");
          element.style.transform = "rotateY(0deg)";

          const index = event.currentTarget.id.replace("card", "");
          if (this.randomNumbers[index] === this.sortedNumbers[this.counter]) {
            if (this.counter + 1 === this.sortedNumbers.length) {
              this.gameResult = "WIN";
              this.$store.dispatch("storeResult", {
                timeStamp: new Date(),
                numbers: this.randomNumbers,
                gameResult: this.gameResult,
              });
            } else {
              this.counter++;
            }
          } else {
            this.gameResult = "LOST";
            for (let i = 0; i < this.numberOfCards; i++) {
              let cardElement = document.querySelector("#card" + i);
              cardElement.style.transform = "rotateY(0deg)";
            }
            this.$store.dispatch("storeResult", {
              timeStamp: new Date(),
              numbers: this.randomNumbers,
              gameResult: this.gameResult,
            });
          }
        }
      }
    },
    getCards(numberOfCards) {
      this.numberOfCards = numberOfCards;
      this.$store
        .dispatch("getRandomNumber", numberOfCards)
        .then(() => {
          setTimeout(function() {
            for (let i = 0; i < numberOfCards; i++) {
              let cardElement = document.querySelector("#card" + i);
              cardElement.style.transform = "rotateY(180deg)";
            }
          }, 1500);
        })
        .then(() => {
          this.gameStep = true;
        });
    },
    reStart() {
      this.gameStep = false;
      this.$store.dispatch("getCardOffer");
      this.gameResult = "";
      this.counter = 0;
    },

    openmodal() {
      let modalElement = document.querySelector(".modal");
      modalElement.style.display = "block";
      this.$store.dispatch("getResults");
    },

    closeModal() {
      let modalElement = document.querySelector(".modal");
      modalElement.style.display = "none";
    },
  },
};
</script>

<style scoped lang="scss">
.card-content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-title {
    color: white;
    margin-bottom: 20px;
  }

  &-title-win {
    color: green;
    font-weight: 600;
  }

  &-title-lost {
    color: red;
    font-weight: 600;
  }
}

.cards {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 30px;
}

.card {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 150px;
  font-size: 32px;
  background-color: rgba(146, 151, 179, 13%);
  border-radius: 14px;
  border: 1px solid rgba(16, 18, 27, 40%);
  cursor: pointer;
  transition: 0.3s ease;
  transition: transform 1s;
  transform-style: preserve-3d;
  margin: 20px 20px;
  margin-top: 20px;
  font-weight: 600;
  justify-content: center;
  align-items: center;

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
  background-color: #55418c;
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
  margin-bottom: 30px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 170px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #9297b3;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-result-title {
  font-weight: bold;
}
</style>
