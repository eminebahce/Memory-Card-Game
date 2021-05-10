import axios from 'axios';

const baseURL = "http://localhost:3000/api/v1";

export const url = axios.create({ baseURL: baseURL });

const state = {
    selection: []
};

const actions = {

    getCardOffer({ commit }) {
        return url.get('/')
            .then(response => {
                commit('setCardOffer', response.data)
            })
            .catch(error => console.log(error))
    }
};

const mutations = {

    setCardOffer(state, payload) {
        state.selection = payload;
    }
}

export default {
    namespaced: false,
    state,
    actions,
    mutations
}