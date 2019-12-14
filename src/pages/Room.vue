<template>
  <div>
    <h2>this room_id is {{currentRoomId}}</h2>
  </div>
</template>

<script>
import { store } from '../store/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'room',
  store: store,
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
    ...mapActions(['getChatListData'], ['getCurrentRoomId']),
    getCurrentRoomIdData () {
      this.$store.dispatch('getCurrentRoomId', { payload: this.$route.params })
    }
  }
}
</script>
