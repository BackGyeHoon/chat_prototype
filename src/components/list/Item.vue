<template>
  <ul>
    <li
      v-for="message in messages"
      :key="message.id"
      class="item"
    >
      <router-link :to="'/room/'+message.room_id">
        <div class="item--content">
          <div class="item--content__photo">
            <figure>
              <img :src="message.user.profile_image_url" :alt="message.user.name" />
            </figure>
          </div>
          <div class="item--content__upper">
            <h2 class="item--content__upper-name">{{ message.user.name }}</h2>
            <p class="item--content__upper-preview">{{ message.preview_message }}</p>
          </div>
          <div class="item--content__low">
            <p class="item--content__low-unread">{{ message.time }}</p>
            <p
              v-if="message.unread_message > 0"
              class="item--content__low-time"
            >{{ message.unread_message }}</p>
          </div>
        </div>
      </router-link>
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
