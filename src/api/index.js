const PHOTO_SEND_FAKE_TIME = 2000

export function sendPhotoApi (payload, cancelToken, handleProgressCallback) {
  return new Promise((resolve, reject) => {
    let progress = 0
    const interval = setInterval(() => {
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
    created_at: payload.created_at,
    content: payload.content,
    room_id: payload.room_id
  })
}
