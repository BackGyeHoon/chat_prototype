import { sendPhotoApi, sendMessageApi, normalizeUsers, normalizeChats, normalizeMessage, normalizeMyGallerys } from '../api/index'

export default {
  async getChatListData ({commit}) {
    commit('getNormalizeUsers', await normalizeUsers())
    commit('getNormalizeChats', await normalizeChats())
    commit('getNormalizeMessage', await normalizeMessage())
  },
  getCurrentRoomId ({commit}, payload) {
    commit('setCurrentRoomId', payload)
  },
  getCurrentUserId ({commit}) {
    commit('getCurrentUser')
  },
  async getMyGalleryData ({ commit }) {
    commit('getNormalizeMyGallerys', await normalizeMyGallerys())
  },
  async sendChatData ({commit}, payload) {
    const resultMessageData = await sendMessageApi(payload)
    try {
      commit('setLoading', { messageId: payload.photoId, loading: true })
      commit('sendMessage', resultMessageData)
      await sendPhotoApi(payload, payload.cancelToken, progress => {
        commit('setPhotoUploadProgress', { messageId: resultMessageData.id, progress, roomId: resultMessageData.room_id })
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
    commit('togglePhotoGallery')
  },
  updateChatMessage ({commit}, payload) {
    commit('currentRoomUpdatePreview', payload)
  },
  setGalleryState ({commit}) {
    commit('hideGalleryState')
  }
}
