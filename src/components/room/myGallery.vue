<template>
  <div>
    <ul class="gallery">
      <li
        v-for="photo in photos"
        :key="photo.id"
        class="gallery--item"
      >
        <figure class="gallery--item__fig">
          <img
            :src="photo.gallery_image_url"
            :alt="photo.name"
            :title="photo.name"
            @click="sendPhotoData({ photoId: photo.id, room_id: getRoomId})"
          />
        </figure>
      </li>
    </ul>
  </div>
</template>
<script>
import { store } from '../../store/index'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'myGallery',
  store: store,
  computed: {
    ...mapState(['photos']),
    getRoomId () {
      return parseInt(this.$route.params.room_id)
    }
  },
  methods: {
    ...mapActions(['sendPhotoData'])
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  position: relative;
  width: 100%;
  height: auto;
  padding: 11px 16px;
  background-color: #5b36ac;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: smooth;
  &--item {
    display: inline-block;
    margin-right: 10px;
    &__fig {
      width: 46px;
      & > img {
        border-radius: 7px;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
