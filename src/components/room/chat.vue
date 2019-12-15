<template>
  <div>
    <ul>
      <li
        v-for="chat in currentRoomMessages"
        :key="chat.id"
        :class="[chat.isYour ? 'isYour' : 'isAnother']"
      >
        <p>{{ chat.content }}</p>
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
  data () {
    return {
      chatData: ''
    }
  },
  computed: {
    ...mapGetters(['currentRoomMessages'])
  },
  methods: {
    ...mapActions(['sendChatData']),
    sendChatMessage () {
      this.$store.dispatch('sendChatData', {
        'user_id': 1,
        'resource_id': 3,
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
