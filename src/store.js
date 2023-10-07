// store.js
import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchUserDetails({ commit }) {
      try {
        const response = await axios.get('/auth/user-details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  },
  plugins: [createPersistedState()]
});
