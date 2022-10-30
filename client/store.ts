import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    accountType: null, // Account type of the logged in user. Either 'Verified' or 'Anonymous'
    firstName: null, // First name of the logged in user
    lastName: null, // Last name of the logged in user
    email: null, // Email of the logged in user
    phone: null, // Phone number of the logged in user
    birthday: null, // Birthday of the logged in user
    verifiedClubs: [], // Array of verified clubs the user is a member of
    pendingClubs: [], // Array of pending clubs the user is a member of
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setAccountType(state, accountType) {
      /**
       * Update the stored accountType to the specified one.
       * @param accountType - new accountType to set
       * 
       */
      state.accountType = accountType;
    },
    setFirstName(state, firstName) {
      /**
       * Update the stored firstName to the specified one.
       * @param firstName - new firstName to set
       * 
       */
      state.firstName = firstName;
    },
    setLastName(state, lastName) {
      /**
       * Update the stored lastName to the specified one.
       * @param lastName - new lastName to set
       * 
       */
      state.lastName = lastName;
    },
    setEmail(state, email) {
      /**
       * Update the stored email to the specified one.
       * @param email - new email to set
       * 
       */
      state.email = email;
    },
    setPhone(state, phone) {
      /**
       * Update the stored phone to the specified one.
       * @param phone - new phone to set
       * 
       */
      state.phone = phone;
    },
    setBirthday(state, birthday) {
      /**
       * Update the stored birthday to the specified one.
       * @param birthday - new birthday to set
       * 
       */
      state.birthday = birthday;
    },
    setVerifiedClubs(state, verifiedClubs) {
      /**
       * Update the stored verifiedClubs to the specified one.
       * @param verifiedClubs - new verifiedClubs to set
       * 
       */
      state.verifiedClubs = verifiedClubs;
    },
    setPendingClubs(state, pendingClubs) {
      /**
       * Update the stored pendingClubs to the specified one.
       * @param pendingClubs - new pendingClubs to set
       * 
       */
      state.pendingClubs = pendingClubs;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
