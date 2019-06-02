import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Web3Check, { ACTIONS } from 'vue-web3-check';
import * as config from './config';
import * as filters from './utils/filters';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);

Web3Check.store.on('update', data => {
  if (
    (data.state.old.account !== null && data.action === ACTIONS.UPD_ACCOUNT) ||
    (data.state.old.networkId !== null &&
      data.action === ACTIONS.UPD_NETWORK_ID)
  ) {
    window.location.reload(false);
  }
});
Vue.use(Web3Check, {
  Web3,
  networks: [config.CHAIN_ID],
  requireAccount: true
});

Vue.filter('fromWei', filters.fromWei);

new Vue({
  render: h => h(App)
}).$mount('#app');
