import axios from 'axios';

const baseURL = "http://localhost:3000/api/v1";

export const url = axios.create({ baseURL: baseURL });

const state = {
    randomNumbers: [],
};

const actions = {
    getRandomNumber({ commit }, numberOfCards) {
        return url.get('/numbers?size=' + numberOfCards)
            .then(response => {
                commit('loadRandomNumbers', response.data)
            })
            .catch(error =>
                console.log(error)
            );
    },
};

const mutations = {
    loadRandomNumbers(state, payload) {
        state.randomNumbers = payload.randomNumbers;
    }
};

export default {
    namespaced: false,
    state,
    actions,
    mutations
}