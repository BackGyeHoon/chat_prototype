<template>
  <div>
    <ZHeader
      :isList="false"
      :details="currentRoom"/>
    <Chat/>
  </div>
</template>

<script>
import ZHeader from '@/components/layouts/Header'
import Chat from '@/components/room/chat'
import { store } from '../store/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'room',
  store: store,
  components: {
    ZHeader,
    Chat
  },
  computed: {
    ...mapGetters(['currentRoom']),
    currentRoomId () {
      return this.$route.params.room_id
    }
  },
  mounted () {
    this.getChatListData()
    this.getCurrentRoomIdData()
  },
  methods: {
    ...mapActions(['getChatListData', 'getCurrentRoomId']),
    getCurrentRoomIdData () {
      this.$store.dispatch('getCurrentRoomId', { payload: this.$route.params })
    }
  }
}
</script>
