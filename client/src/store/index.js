import Vue from "vue";
import Vuex from "vuex";
import cardSelection from './modules/cardSelection';
import numbers from './modules/numbers';
import results from './modules/results';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cardSelection,
        numbers,
        results
    }
});