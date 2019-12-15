export default {
  getChatListData ({commit}) {
    commit('getNormalizeUsers')
    commit('getNormalizeChats')
    commit('getNormalizeMessage')
  },
  getCurrentRoomId ({commit}, payload) {
    commit('setCurrentRoomId', payload)
  },
  sendChatData ({commit}, payload) {
    commit('sendMessage', payload)
  }
}
