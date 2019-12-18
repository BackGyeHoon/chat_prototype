<template>
  <div
    :class="[
      'message',
      messageObject.user_id === currentUserId ? 'isYour' : 'isFriend'
    ]"
  >
    <template v-if="messageObject.content">
      <p class="message--content">{{ messageObject.content }}</p>
    </template>
    <template v-else-if="messageObject.resource">
      <figure class="message--fig">
        <img
          :src="messageObject.resource.gallery_image_url"
          :alt="messageObject.resource.name"
        >
        <div
          v-if="messageObject.resource.progress !== 1"
          class="message--progressbar">
          <div
            :style="{ width : (messageObject.resource.progress * 100) + '%'}"
            class="message--progressbar__status"
          >상태</div>
        </div>
        <button
          v-if="messageObject.resource.progress !== 1"
          @click="sendCancelState"
          type="button"
          class="message--cancel"
        >취소</button>
      </figure>
    </template>
  </div>
</template>
<script>
import { store } from '../../store/index'
import { mapState } from 'vuex'

export default {
  name: 'Message',
  store: store,
  props: {
    messageObject: {
      type: [Array, Object]
    }
  },
  computed: {
    ...mapState(['currentUserId'])
  },
  methods: {
    sendCancelState () {
      this.$emit('cancelState')
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes itemEnter {
  0% {
    opacity: 0;
    left: 10rem;
  }
  100% {
    opacity: 1;
    left: 0;
  }
}
.message {
  &--content {
    position: relative;
    display: inline-block;
    padding: 1.2rem;
    background-color: #fff;
    letter-spacing: -0.01rem;
    color: #363a42;
    border-radius: 1.2rem;
    box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.1);
    text-align: left;
    font: {
      size: 1.4rem;
      weight: 600;
    }
    animation: itemEnter 0.5s;
  }
  &.isYour {
    width: 100%;
    display: table;
    & > p {
      background-color: #5b36ac;
      color:#fff;
    }
    & > figure {
      position: relative;
      float: right;
      width: 20rem;
      margin-bottom: 1rem;
      animation: itemEnter 0.5s;
      & > img {
        border-radius: 1.5rem;
      }
    }
  }
  &--cancel {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 100%;
    background-color: #000;
    opacity: .8;
    text-indent: -9999px;
    z-index: 999;
    &:after {
      content: '';
      position: absolute;
      width: 1.6rem;
      height: 1.6rem;
      background-image: url('~@/assets/imgs/chat/ic-cancel.svg');
      background-size: cover;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  &--progressbar {
    width: 100%;
    height: .6rem;
    margin-top: 6px;
    background-color: #e5e5e7;
    border-radius: 3px;
    overflow: hidden;
    text-indent: -9999px;
    &__status {
      width: 0%;
      background-color: #5b36ac;
      transition: all 500ms;
    }
  }
}

@keyframes loading {
  0% {
    transform-origin: 100% 100%;
    transform: rotate(0deg);
  }
  100% {
    transform-origin: 100% 100%;
    transform: rotate(360deg);
  }
}
</style>
