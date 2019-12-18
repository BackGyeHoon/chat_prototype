<template>
  <div class="list">
    <Header :isList="true"/>
    <List :messages="chatList"/>
  </div>
</template>

<script>
import 'babel-polyfill'
import Header from '@/components/layouts/Header'
import List from '@/components/list/Item'
import { store } from '../store/index'
import { mapGetters } from 'vuex'

export default {
  name: 'list',
  store: store,
  components: {
    Header,
    List
  },
  computed: {
    ...mapGetters(['chatList'])
  }
}
</script>
<style lang="scss" scoped>
.list {
  overflow-x: hidden;
}
</style>
