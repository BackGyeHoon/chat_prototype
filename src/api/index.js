const PHOTO_SEND_FAKE_TIME = 2000

export function normalizeUsers () {
  const userData = require('./userInfoData.json')
  return Promise.resolve(userData)
}

export function normalizeChats () {
  const chatsData = require('./usedChatData.json')
  return Promise.resolve(chatsData)
}

export function normalizeMessage () {
  const messageData = require('./normalizeMessage.json')
  return Promise.resolve(messageData)
}

export function normalizeMyGallerys () {
  const galleryData = require('./myGalleryData.json')
  return Promise.resolve(galleryData)
}

export function sendPhotoApi (payload, cancelToken, handleProgressCallback) {
  return new Promise((resolve, reject) => {
    let progress = 0
    const interval = setInterval(() => {
      if (cancelToken && cancelToken.isCancel) {
        reject(new Error('Token is cancel'))
      }
      handleProgressCallback(progress += 0.1)
    }, PHOTO_SEND_FAKE_TIME / 10)
    setTimeout(() => {
      clearInterval(interval)
      handleProgressCallback(1)
      if (!cancelToken || !cancelToken.isCancel) {
        const photoData = require('./myGalleryData.json')
        const findPhotoResult = photoData.find(
          photo => photo.id === payload.id
        )
        resolve(findPhotoResult)
      } else {
        reject(new Error('Token is cancel'))
      }
    }, PHOTO_SEND_FAKE_TIME)
  })
}

let messageId = 999
export function sendMessageApi (payload) {
  return Promise.resolve({
    id: ++messageId,
    user_id: payload.user_id,
    resource_id: payload.resource_id,
    updated_at: payload.updated_at,
    content: payload.content,
    room_id: payload.room_id
  })
}
