<template>
  <div class="chat">
    <MyGallery v-if="isPhotoGallery"/>
      <ul class="chat--list">
        <li
          v-for="chat in currentRoomMessages"
          :key="chat.id"
          :class="['chat--item', chat.isYour ? 'isYour' : 'isAnother']"
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
    ...mapState(['isPhotoGallery']),
    ...mapGetters(['currentRoomMessages'])
  },
  mounted () {
    this.getMyGalleryData()
    this.resetUnreadMessage({
      'room_id': parseInt(this.$route.params.room_id)
    })
  },
  methods: {
    ...mapActions(['sendChatData', 'getMyGalleryData', 'resetUnreadMessage', 'resetUnreadMessage', 'updateChatMessage']),
    sendChatMessage () {
      if (this.chatData === '') {
        alert('메세지를 입력해주세요.')
      } else {
        this.$store.dispatch('sendChatData', {
          'user_id': 0,
          'resource_id': null,
          'created_at': '',
          'content': this.chatData,
          'room_id': parseInt(this.$route.params.room_id),
          'isYour': true
        })
        this.updateChatMessage({
          'room_id': parseInt(this.$route.params.room_id),
          'preview_message': this.chatData
        })
        this.chatData = ''
      }
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
  overflow-x: hidden;
  &--list {
    width: 100%;
    height: 100%;
    padding: 20px 16px 100px;
  }
  &--item {
    margin-bottom: 10px;
    animation: itemEnter 0.5s;
    & > p {
      display: inline-block;
      padding: 12px;
      background-color: #fff;
      letter-spacing: -0.1px;
      color: #363a42;
      border-radius: 12px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
      font: {
        size: 14px;
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
        width: 200px;
        margin-bottom: 10px;
        & > img {
          border-radius: 15px;
        }
      }
    }
    @keyframes itemEnter {
      0% {
        opacity: 0;
        margin-left: 100px;
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
    padding: 20px 16px;
    background-color: #f9f9fb;
    &__input {
      padding: 16px;
      width: 85%;
      height: 50px;
      border: 0;
      background-color: #fff;
      border-radius: 25px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
      font: {
        size: 14px;
        weight:500;
      }
    }
    &__btn {
      position: relative;
      width: 50px;
      height: 50px;
      margin-left: 12px;
      background-color: #5b36ac;
      border-radius: 100%;
      text-indent: -9999px;
      &:after {
        content: '';
        position: absolute;
        width: 26px;
        height: 18px;
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
