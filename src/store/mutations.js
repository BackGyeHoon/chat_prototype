export default {
  getNormalizeUsers (state) {
    const getUsersData = require('../api/userInfoData.json')
    state.users = getUsersData
  },
  getNormalizeChats (state) {
    const getChatsData = require('../api/usedChatData.json')
    state.chats = getChatsData
  },
  getNormalizeMessage (state) {
    const getMessagesData = require('../api/normalizeMessage.json')
    state.messages = getMessagesData
  },
  getNormalizeMyGallerys (state) {
    const getMyGalleryData = require('../api/myGalleryData.json')
    state.photos = getMyGalleryData
  },
  setCurrentRoomId (state, payload) {
    state.currentRoomId = parseInt(payload.payload.room_id)
  },
  sendMessage (state, payload) {
    state.messages.push(payload)
  },
  sendPhoto (state, payload) {
    state.messages.push({
      user_id: 0,
      resource_id: payload.photoId,
      created_at: null,
      content: null,
      room_id: payload.room_id,
      isYours: true
    })
  },
  setPhotoGallery (state) {
    if (state.isPhotoGallery) {
      state.isPhotoGallery = false
    } else {
      state.isPhotoGallery = true
    }
  },
  currentRoomMessagesState (state, payload) {
    console.log(payload)
  }
}
