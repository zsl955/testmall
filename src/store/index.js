import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  getters: {
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  },
  mutations: {
    addCart(state,payLoad){
      let product = state.cartList.find(function(item){
        return item.iid === payLoad.iid
      })
      if(product){
        product.count += 1
      }else{
        payLoad.count = 1
        state.cartList.push(payLoad)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
