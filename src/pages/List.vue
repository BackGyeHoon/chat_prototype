<template>
  <div class="list">
    <ZHeader :isList="true"/>
    <Zlist :messages="chatList"/>
  </div>
</template>

<script>
import 'babel-polyfill'
import ZHeader from '@/components/layouts/Header'
import Zlist from '@/components/list/Item'
import { store } from '../store/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'list',
  store: store,
  components: {
    ZHeader,
    Zlist
  },
  computed: {
    ...mapGetters(['chatList'])
  },
  mounted () {
    this.getChatListData()
  },
  methods: {
    ...mapActions(['getChatListData'])
  }
}
</script>
<style lang="scss" scoped>
.list {
  overflow-x: hidden;
}
</style>
