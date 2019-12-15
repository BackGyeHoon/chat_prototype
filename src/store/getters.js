function denormalizeMessage (state, message) {
  return {
    ...message,
    // user: state.users.find(user => user.id === message.user_id),
    resource: state.photos.find(photo => photo.id === message.resource_id),
    preview_data: state.chats.find(chat => chat.id === message.id)
  }
}

function denormalizeChat (state, chat) {
  const user = state.users.find(user => user.id === chat.user_id)
  const previewMessage = state.messages.find(message => message.id === chat.preview_id)
  return {
    ...chat,
    user,
    preview_message: denormalizeMessage(state, previewMessage)
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
