import { shallowMount, createLocalVue, createStore } from '@vue/test-utils';
import Vuex from 'vuex';
import cardSelection from '../../src/store/modules/cardSelection';
import results from '../../src/store/modules/results';
import numbers from '../../src/store/modules/numbers'

const localVue = createLocalVue();
localVue.use(Vuex);

let actions;
let store;
let mutations;

const data = {
    selection: [],
    randomNumbers: [],
    gameResult: ''
};

describe('Card component', () => {

    beforeEach(() => {
        actions = {
            "getCardOffer": jest.fn(() => Promise.resolve()),
            "getRandomNumber": jest.fn(() => Promise.resolve()),
            "storeResult": jest.fn(() => Promise.resolve()),
        };
        store = new Vuex.Store({
            actions,
            mutations
        });
        mutations = {
            "numbers.loadRandomNumbers": jest.fn()
        }
    });

    test('checkResponse', () => {
        const state = {
            gameResult: '',
        };
        results.mutations.checkResponse(state, data.gameResult)
        expect(state.gameResult).toBe(data.gameResult);
    });

    test('setCardOffer', () => {
        const state = {
            selection: []
        };
        cardSelection.mutations.setCardOffer(state, data.selection);
        expect(state.selection).toBe(data.selection);

    });

});
