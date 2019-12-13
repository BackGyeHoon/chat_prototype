import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'vue-axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    returnMessageData: []
  },
  actions: {
    getUserInfoData: (state) => {
      axios.get('../api/usedMessageData.json')
        .then((resolveData) => {
          const userMessageDataArray = resolveData.usedMessageData
          const userInfoDataArray = resolveData.userInfoData
          state.returnMessageData = Array.prototype.push.apply(userMessageDataArray, userInfoDataArray)
        })
    }
  }
})
