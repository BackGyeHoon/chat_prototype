function denormalizeMessage (state, message) {
  return {
    ...message,
    resource: state.photos.find(photo => photo.id === message.resource_id),
    preview_data: state.chats.find(chat => chat.room_id === message.room_id)
  }
}

function denormalizeChat (state, chat) {
  const user = state.users.find(user => user.id === chat.user_id)
  const previewMessage = state.messages.find(message => message.room_id === chat.preview_id)
  return {
    ...chat,
    user,
    chats: denormalizeMessage(state, previewMessage)
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
