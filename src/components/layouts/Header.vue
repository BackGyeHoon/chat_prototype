<template>
    <header
        :class="[
          'header',
          isList ? 'list' : 'room'
        ]"
    >
      <template v-if="details">
        <button
          @click="$router.go(-1)"
          class="header--back"
        >뒤로가기</button>
        <h2 class="header--title">{{ details.user.name }}</h2>
        <div>
          <button
            @click="togglePhotoGallery()"
            class="header--photo"
          >사진업로드</button>
          <button class="header--search">검색</button>
        </div>
      </template>
      <template v-else>
        <button class="header--menu">메뉴</button>
        <h2 class="header--title">채팅</h2>
        <button class="header--mypage">마이페이지</button>
      </template>
    </header>
</template>

<script>
import { store } from '../../store/index'
import { mapActions } from 'vuex'

export default {
  name: 'ZHeader',
  store: store,
  props: {
    isList: {
      type: Boolean,
      default: true
    },
    details: {
      type: [Array, Object],
      required: false
    }
  },
  methods: {
    ...mapActions(['togglePhotoGallery'])
  }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;
    padding: 2rem 1.2rem;
    background-color: #5b36ac;
    &--menu,
    &--mypage,
    &--back,
    &--photo,
    &--search {
        width: 2.4rem;
        height: 2.4rem;
        font-size: 0;
        background-size: cover;
        cursor: pointer;
    }
    &--title {
        position: absolute;
        font: {
            size: 1.7rem;
            weight: bold;
        }
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: #fff;
    }
    &--menu {
        background-image: url('~@/assets/imgs/header/ic-menu.svg');
    }
    &--mypage {
        background-image: url('~@/assets/imgs/header/ic-mypage.svg');
    }
    &--back {
      background-image: url('~@/assets/imgs/header/ic-back.svg');
    }
    &--photo {
      margin-right: 1.7rem;
      background-image: url('~@/assets/imgs/header/ic-upload.svg');
    }
    &--search {
      background-image: url('~@/assets/imgs/header/ic-search.svg');
    }
}

.list {
  margin-bottom: 1.0rem;
}
</style>
