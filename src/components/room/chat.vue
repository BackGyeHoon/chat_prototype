<template>
  <div>
    <MyGallery />
    <ul>
      <li
        v-for="chat in currentRoomMessages"
        :key="chat.id"
        :class="[chat.isYour ? 'isYour' : 'isAnother']"
      >
        <template v-if="chat.content">
          <p>{{ chat.content }}</p>
        </template>
        <template v-else-if="chat.resource">
          <figure>
            <img :src="chat.resource.gallery_image_url">
          </figure>
        </template>
      </li>
    </ul>
    <div>
      <input
        v-model="chatData"
        type="text"
        style="border:1px solid black"
      >
      <button
        @click="sendChatMessage()"
        type="submit">전송</button>
    </div>
  </div>
</template>

<script>
import MyGallery from './myGallery'

import { mapActions, mapGetters } from 'vuex'
import { store } from '../../store/index'

export default {
  name: 'Chat',
  store: store,
  props: {
    messagesData: {
      type: [Array, Object],
      required: false
    }
  },
  components: {
    MyGallery
  },
  data () {
    return {
      chatData: ''
    }
  },
  computed: {
    ...mapGetters(['currentRoomMessages'])
  },
  mounted () {
    this.getMyGalleryData()
  },
  methods: {
    ...mapActions(['sendChatData', 'getMyGalleryData']),
    sendChatMessage () {
      this.$store.dispatch('sendChatData', {
        'user_id': 0,
        'resource_id': null,
        'created_at': '',
        'content': this.chatData,
        'room_id': parseInt(this.$route.params.room_id),
        'isYour': true
      })
    }
  }
}
</script>
<style lang scoped>
.isAnother {
  padding: 12px;
}
.isYour {
  padding: 12px;
  text-align: right;
}
</style>
