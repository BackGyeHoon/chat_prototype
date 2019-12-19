export default {
  getNormalizeUsers (state, payload) {
    state.users = payload
  },
  getNormalizeChats (state, payload) {
    state.chats = payload
  },
  getNormalizeMessage (state, payload) {
    state.messages = payload
  },
  getNormalizeMyGallerys (state, payload) {
    state.photos = payload
  },
  setCurrentRoomId (state, payload) {
    state.currentRoomId = parseInt(payload.payload.room_id)
  },
  sendMessage (state, payload) {
    state.messages.push(payload)
    state.chats = state.chats.map(chat => {
      if (chat.id === payload.room_id) {
        return {
          ...chat,
          updated_at: payload.updated_at,
          resource_id: payload.resource_id
        }
      } else {
        return chat
      }
    })
  },
  removeMessageData (state, payload) {
    state.messages = state.messages.filter(message => {
      if (message.id !== payload.id) {
        return {
          ...message
        }
      }
    })
  },
  togglePhotoGallery (state) {
    state.isPhotoGallery = !state.isPhotoGallery
  },
  currentRoomMessagesState (state, payload) {
    state.chats = state.chats.map(chat => {
      if (chat.id === payload.room_id) {
        return {
          ...chat,
          unread_message: 0
        }
      } else {
        return chat
      }
    })
  },
  currentRoomUpdatePreview (state, payload) {
    state.chats = state.chats.map(chat => {
      if (chat.id === payload.room_id) {
        return {
          ...chat,
          preview_id: payload.message_id,
          preview_message: payload.preview_message
        }
      } else {
        return chat
      }
    })
  },
  getCurrentUser (state) {
    state.currentUserId = 1
  },
  hideGalleryState (state) {
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
