function updateUnreadMessage (state, payload, type) {
  const getChatsState = state.chats.find(chat => chat.room_id === payload.room_id)
  if (type === 'count') {
    getChatsState.unread_message = 0
  } else if (type === 'message') {
    getChatsState.preview_message = payload.preview_message
  } else if (type === 'photo') {
    getChatsState.preview_message = '사진을 보냈습니다.'
  }
}

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
    const getChatTime = state.chats.find(chat => chat.room_id === payload.room_id)
    getChatTime.created_at = payload.created_at
    state.messages.push(payload)
  },
  removeMessageData (state, payload) {
    const getMessageData = state.messages.filter(message => message.id !== payload.id)
    state.messages = getMessageData
  },
  setPhotoGallery (state) {
    if (state.isPhotoGallery) {
      state.isPhotoGallery = false
    } else {
      state.isPhotoGallery = true
    }
  },
  currentRoomMessagesState (state, payload) {
    updateUnreadMessage(state, payload, 'count')
  },
  currentRoomUpdateChatMessage (state, payload) {
    updateUnreadMessage(state, payload, 'message')
  },
  currentRoomMessagePhoto (state, payload) {
    updateUnreadMessage(state, payload, 'photo')
  },
  getCurrentUser (state) {
    state.currentUserId = 1
  },
  setGalleryState (state) {
    state.isPhotoGallery = false
  },
  setLoading (state, { messageId, loading }) {
    state.photoLoadingMap = {
      ...state.photoLoadingMap,
      [messageId]: loading
    }
  },
  setPhotoUploadProgress (state, { messageId, progress }) {
    state.photoUploadProgessMap = {
      ...state.photoUploadProgessMap,
      [messageId]: progress
    }
  }
}
