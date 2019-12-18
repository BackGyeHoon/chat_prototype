<template>
  <div class="parent">
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
            @click="$emit('sendPhotoData', {
              photoId: photo.id
            })"
          />
        </figure>
      </li>
    </ul>
  </div>
</template>
<script>
import { store } from '../../store/index'
import { mapState } from 'vuex'

export default {
  name: 'myGallery',
  store: store,
  computed: {
    ...mapState(['photos']),
    getRoomId () {
      return parseInt(this.$route.params.room_id)
    }
  }
}
</script>
<style lang="scss" scoped>
.parent {
  position: fixed;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  font-size: 0;
  -webkit-overflow-scrolling: smooth;
  width: 100%;
  top:6.4rem;
  z-index:99;
  background-color: #5b36ac;
}
.gallery {
  position: relative;
  width: 100%;
  height: auto;
  padding: 1.1rem 1.6rem;
  &--item {
    display: inline-block;
    margin-right: 1rem;
    &__fig {
      width: 4.6rem;
      & > img {
        border-radius: .7rem;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
