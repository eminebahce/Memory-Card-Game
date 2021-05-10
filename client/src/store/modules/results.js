import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

export const url = axios.create({ baseURL: baseURL });

const state = {
    history: [],
    gameResult: ""
};

const actions = {
    storeResult({ commit }, request) {
        console.log(request)
        return url
            .post("/results", request)
            .then(() => {
                commit("checkResponse", request.gameResult);
            })
            .catch((error) => console.log(error));
    },
};

const mutations = {
    checkResponse(state, payload) {
        state.gameResult = payload
        console.log('XXXXX', state.gameResult)
    },
};

export default {
    namespaced: false,
    state,
    actions,
    mutations,
};