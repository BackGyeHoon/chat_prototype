<template>
  <div class="chat">
    <MyGallery @sendPhotoData="setPhotoData" v-if="isPhotoGallery"/>
      <ul class="chat--list">
        <li
          v-for="chat in currentRoomMessages"
          :key="chat.id"
          class="chat--item"
        >
          <Message @cancelState="setCancelState" :messageObject='chat'/>
        </li>
      </ul>
    <form @submit.prevent="handleSubmitMessage" class="chat--footer">
      <input
        v-model="chatData"
        type="text"
        class="chat--footer__input"
        placeholder="메세지를 입력하세요.."
      >
      <button
        :class="[
          'chat--footer__btn']"
        :disabled="chatData === ''"
        type="submit"
      >전송</button>
    </form>
  </div>
</template>

<script>
import MyGallery from './myGallery'
import Message from './message'

import { mapActions, mapGetters, mapState } from 'vuex'
import { store } from '../../store/index'

export default {
  name: 'Chat',
  store: store,
  components: {
    MyGallery,
    Message
  },
  data () {
    return {
      chatData: '',
      cancelToken: { isCancel: false },
      setPhotoId: ''
    }
  },
  computed: {
    ...mapState(['isPhotoGallery', 'currentUserId', 'isPhotoLoading']),
    ...mapGetters(['currentRoomMessages'])
  },
  mounted () {
    this.getMyGalleryData()
    this.resetUnreadMessage({
      'room_id': parseInt(this.$route.params.room_id)
    })
    this.moveBottomScroll()
  },
  methods: {
    ...mapActions(['sendChatData', 'getMyGalleryData', 'resetUnreadMessage', 'updateChatMessage']),
    async sendChatMessage ({ content = '', photoId = null }) {
      this.cancelToken = { isCancel: false }
      const currentDate = new Date()
      const currentHours = currentDate.getHours()
      const currentMinute = currentDate.getMinutes()
      const setTime = `${
        currentHours < 10 ? `0${currentHours}` : currentHours}:${
        currentMinute < 10 ? `0${currentMinute}` : currentMinute
      }`
      await this.$store.dispatch('sendChatData', {
        'user_id': this.currentUserId,
        'resource_id': photoId,
        'created_at': setTime,
        'content': content,
        'room_id': parseInt(this.$route.params.room_id),
        'cancelToken': this.cancelToken
      })
      this.updateChatMessage({
        'room_id': parseInt(this.$route.params.room_id),
        'preview_message': this.chatData
      })
      this.chatData = ''
      window.requestAnimationFrame(() => {
        this.moveBottomScroll()
      })
    },
    moveBottomScroll () {
      const container = document.querySelector('body, html')
      const scrollHeight = container.scrollHeight
      container.scrollTop = scrollHeight
    },
    setCancelState () {
      this.cancelToken.isCancel = true
    },
    setPhotoData ({ photoId }) {
      this.sendChatMessage({ photoId: photoId })
    },
    handleSubmitMessage () {
      this.sendChatMessage({ content: this.chatData })
    }
  }
}
</script>
<style lang="scss" scoped>
.isYour {
  text-align: right;
}
.chat {
  position: absolute;
  width: 100%;
  min-height: 90%;
  background-color: #f9f9fb;
  overflow: hidden;
  &--list {
    width: 100%;
    height: 100%;
    padding: 2rem 1.6rem 10rem;
  }
  &--item {
    margin-bottom: 1rem;
    line-height: 1.5;
    animation: itemEnter 0.5s;
  }
  &--footer {
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    padding: 2rem 1.6rem;
    background-color: #f9f9fb;
    z-index: 9999;
    &__input {
      padding: 1.6rem;
      width: 28.1rem;
      height: 5rem;
      border: 0;
      background-color: #fff;
      border-radius: 2.5rem;
      box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.1);
      font: {
        size: 1.4rem;
        weight:500;
      }
    }
    &__btn {
      position: relative;
      width: 5rem;
      height: 5rem;
      margin-left: 1.2rem;
      background-color: #5b36ac;
      border-radius: 100%;
      text-indent: -9999px;
      transition: 500ms;
      &:disabled {
        background-color: gray;
        transition: 500ms;
      }
      &:after {
        content: '';
        position: absolute;
        width: 2.6rem;
        height: 1.8rem;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: {
          image: url('~@/assets/imgs/header/ic-send.svg');
          size: cover;
        }
      }
    }
  }
}
</style>
