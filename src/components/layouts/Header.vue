<template>
    <header
        :class="['header', isList ? 'list' : 'room']"
    >
      <template v-if="details">
        <button class="header--menu">메뉴</button>
        <h2 class="header--title">{{ details.user.name }}</h2>
        <button class="header--mypage">마이페이지</button>
      </template>
      <template v-else>
        <button class="header--menu">메뉴</button>
        <h2 class="header--title">채팅</h2>
        <button class="header--mypage">마이페이지</button>
      </template>
    </header>
</template>

<script>
export default {
  name: 'ZHeader',
  props: {
    isList: {
      type: Boolean,
      default: true
    },
    details: {
      type: [Array, Object],
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;
    padding: 20px 12px;
    background-color: #5b36ac;
    &--menu,
    &--mypage {
        width: 24px;
        height: 24px;
        font-size: 0;
        background-size: cover;
        cursor: pointer;
    }
    &--title {
        position: absolute;
        font: {
            size: 17px;
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
        background-image: url(('~@/assets/imgs/header/ic-mypage.svg'));
    }
}

.list {
  margin-bottom: 10px;
}
</style>
