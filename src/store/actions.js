export default {
  getChatListData ({commit}) {
    commit('getNormalizeUsers')
    commit('getNormalizeChats')
    commit('getNormalizeMessage')
  },
  getCurrentRoomId ({commit}, payload) {
    commit('setCurrentRoomId', payload)
  },
  getMyGalleryData ({ commit }) {
    commit('getNormalizeMyGallerys')
  },
  sendChatData ({commit}, payload) {
    commit('sendMessage', payload)
  },
  sendPhotoData ({commit}, payload) {
    commit('sendPhoto', payload)
  },
  resetUnreadMessage ({commit}, payload) {
    commit('currentRoomMessagesState', payload)
  },
  togglePhotoGallery ({commit}) {
    commit('setPhotoGallery')
  }
}
