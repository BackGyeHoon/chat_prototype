<template>
  <div class="chat">
    <MyGallery v-if="isPhotoGallery"/>
      <ul class="chat--list">
        <li
          v-for="chat in currentRoomMessages"
          :key="chat.id"
          :class="[
            'chat--item',
            chat.user_id === currentUserId ? 'isYour' : 'isFriend'
          ]"
        >
          <template v-if="chat.content">
            <p>{{ chat.content }}</p>
          </template>
          <template v-else-if="chat.resource">
            <figure>
              <img
                :src="chat.resource.gallery_image_url"
                :alt="chat.resource.name"
              >
            </figure>
          </template>
        </li>
      </ul>
    <div class="chat--footer">
      <input
        v-model="chatData"
        type="text"
        class="chat--footer__input"
        placeholder="메세지를 입력하세요.."
      >
      <button
        @click="sendChatMessage()"
        class="chat--footer__btn"
        type="submit"
      >전송</button>
    </div>
  </div>
</template>

<script>
import MyGallery from './myGallery'

import { mapActions, mapGetters, mapState } from 'vuex'
import { store } from '../../store/index'

export default {
  name: 'Chat',
  store: store,
  components: {
    MyGallery
  },
  data () {
    return {
      chatData: ''
    }
  },
  computed: {
    ...mapState(['isPhotoGallery', 'currentUserId']),
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
    sendChatMessage () {
      const currentDate = new Date()
      const currentHours = currentDate.getHours()
      const currentMinute = currentDate.getMinutes()
      const setTime = `${
        currentHours < 10 ? `0${currentHours}` : currentHours}:${
        currentMinute < 10 ? `0${currentMinute}` : currentMinute
      }`

      if (this.chatData === '') {
        alert('메세지를 입력해주세요.')
      } else {
        this.$store.dispatch('sendChatData', {
          'user_id': this.currentUserId,
          'resource_id': null,
          'created_at': setTime,
          'content': this.chatData,
          'room_id': parseInt(this.$route.params.room_id),
          'isYour': true
        })
        this.updateChatMessage({
          'room_id': parseInt(this.$route.params.room_id),
          'preview_message': this.chatData
        })
        this.chatData = ''
        this.moveBottomScroll()
      }
    },
    moveBottomScroll () {
      const container = document.querySelector('.chat--list')
      const scrollHeight = container.scrollHeight
      container.scrollTop = scrollHeight
      console.log(container.scrollTop)
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
    animation: itemEnter 0.5s;
    & > p {
      display: inline-block;
      padding: 1.2rem;
      background-color: #fff;
      letter-spacing: -0.01rem;
      color: #363a42;
      border-radius: 1.2rem;
      box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.1);
      font: {
        size: 1.4rem;
        weight: 600;
      };
    }
    &.isYour {
      width: 100%;
      display: table;
      & > p {
        background-color: #5b36ac;
        color:#fff;
      }
      & > figure {
        float: right;
        width: 20rem;
        margin-bottom: 1rem;
        & > img {
          border-radius: 1.5rem;
        }
      }
    }
    @keyframes itemEnter {
      0% {
        opacity: 0;
        margin-left: 10rem;
      }
      100% {
        opacity: 1;
        margin-left: 0;
      }
    }
  }
  &--footer {
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    padding: 2rem 1.6rem;
    background-color: #f9f9fb;
    &__input {
      padding: 1.6rem;
      width: 85%;
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
