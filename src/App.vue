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
  },
  methods: {
    ...mapActions(['getCurrentUserId'])
  }
}
</script>

<style>
@import "./styles/reset.scss";
</style>
