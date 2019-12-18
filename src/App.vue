<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { store } from './store/index'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  store: store,
  mounted () {
    this.getCurrentUserId()
    this.getChatListData()
  },
  methods: {
    ...mapActions(['getCurrentUserId', 'getChatListData'])
  }
}
</script>

<style>
@import "./styles/reset.scss";
</style>
