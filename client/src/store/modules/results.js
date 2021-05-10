import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

export const url = axios.create({ baseURL: baseURL });

const state = {
    history: [],
    gameResult: ""
};

const actions = {
    storeResult({ commit }, request) {
        return url
            .post("/results", request)
            .then((response) => {
                commit("checkResponse", response);
            })
            .catch((error) => console.log(error));
    },

    getResults({ commit }) {
        return url.get('/results')
            .then(response => {
                commit('loadResults', response.data)
            })
            .catch(error => console.log(error))
    }
};

const mutations = {
    checkResponse() {
        //nothing to return
    },

    loadResults(state, payload) {
        state.history = payload;
    }
};

export default {
    namespaced: false,
    state,
    actions,
    mutations,
};