import { sendPhotoApi, sendMessageApi } from '../api/index'

export default {
  getChatListData ({commit}) {
    commit('getNormalizeUsers')
    commit('getNormalizeChats')
    commit('getNormalizeMessage')
  },
  getCurrentRoomId ({commit}, payload) {
    commit('setCurrentRoomId', payload)
  },
  getCurrentUserId ({commit}) {
    commit('getCurrentUser')
  },
  getMyGalleryData ({ commit }) {
    commit('getNormalizeMyGallerys')
  },
  async sendChatData ({commit}, payload) {
    const resultMessageData = await sendMessageApi(payload)
    try {
      commit('setLoading', { messageId: payload.photoId, loading: true })
      commit('sendMessage', resultMessageData)
      commit('currentRoomMessagePhoto', payload)
      await sendPhotoApi(payload, payload.cancelToken, progress => {
        commit('setPhotoUploadProgress', { messageId: resultMessageData.id, progress })
      })
    } catch (e) {
      commit('removeMessageData', resultMessageData)
    } finally {
      commit('setLoading', { messageId: payload.photoId, loading: true })
    }
  },
  resetUnreadMessage ({commit}, payload) {
    commit('currentRoomMessagesState', payload)
  },
  togglePhotoGallery ({commit}) {
    commit('setPhotoGallery')
  },
  updateChatMessage ({commit}, payload) {
    commit('currentRoomUpdateChatMessage', payload)
  },
  setGalleryState ({commit}) {
    commit('setGalleryState')
  }
}
