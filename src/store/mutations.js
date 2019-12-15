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
  setCurrentRoomId (state, payload) {
    state.currentRoomId = parseInt(payload.payload.room_id)
  }
}
