import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },
  getters: {
    cartItemCount: (state) => {
      return state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
    },
  },
  mutations: {
    initializeStore(state) {
      try {
          const storedCart = JSON.parse(localStorage.getItem('cart'));
          if (storedCart && Array.isArray(storedCart.items)) {
              state.cart = storedCart;
          } else {
              throw new Error('Invalid cart format');
          }
      } catch {
          state.cart = { items: [] };
          localStorage.setItem('cart', JSON.stringify(state.cart));
      }

      if(localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.find(i => i.product.id === item.product.id);

      if (exists) {
          exists.quantity += parseInt(item.quantity, 10) || 0;
      } else {
          state.cart.items = [...state.cart.items, {
              product: item.product,
              quantity: parseInt(item.quantity, 10) || 1,
          }];
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
    loadCart({ commit }) {
      commit('initializeStore');
    },
  },
  modules: {},
});
