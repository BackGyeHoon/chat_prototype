<template>
  <ul>
    <li
      v-for="message in messages"
      :key="message.idx"
      class="item"
    >
      <div class="item--content">
        <div class="item--content__photo">
          <figure>
          </figure>
        </div>
        <div class="item--content__upper">
          <h2 class="item--content__upper-name">{{ message.user_name }}</h2>
          <p class="item--content__upper-preview">{{ message.preview_message }}</p>
        </div>
        <div class="item--content__low">
          <p class="item--content__low-unread">{{ message.time }}</p>
          <p class="item--content__low-time">{{ message.unread_message }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { store } from '../../store/index'
import { mapActions } from 'vuex'

export default {
  name: 'item',
  store: store,
  props: {
    messages: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    ...mapActions(['insertChat'])
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 100%;
  height: 74px;
  padding: 9px 16px;
  &:last-child {
    padding-bottom: 0;
  }
}
</style>
