function denormalizeResource (state, id, messageId) {
  return {
    ...state.photos.find(photo => photo.id === id),
    loading: Boolean(state.photoLoadingMap[messageId]),
    progress: state.photoUploadProgessMap[messageId]
  }
}

function denormalizeMessage (state, message) {
  return {
    ...message,
    resource: message.resource_id && denormalizeResource(state, message.resource_id, message.id),
    preview_data: state.chats.find(chat => chat.room_id === message.room_id)
  }
}

function denormalizeChat (state, chat) {
  const user = state.users.find(user => user.id === chat.user_id)
  const previewMessage = state.messages.find(message => message.room_id === chat.preview_id)
  return {
    ...chat,
    user,
    previewMessage: previewMessage && denormalizeMessage(state, previewMessage)
  }
}

export default {
  chatList (state) {
    return state.chats.map((chat) => denormalizeChat(state, chat))
  },
  currentRoom (state) {
    if (!state.currentRoomId) {
      return null
    } else {
      return denormalizeChat(state, state.chats.find(chat => chat.room_id === state.currentRoomId))
    }
  },
  currentRoomMessages (state) {
    if (!state.currentRoomId) {
      return null
    } else {
      return state.messages
        .filter(message => message.room_id === state.currentRoomId)
        .map(message => denormalizeMessage(state, message))
    }
  }
}
