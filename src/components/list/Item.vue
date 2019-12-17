<template>
  <ul>
    <li
      v-for="message in messages"
      :key="message.id"
      class="item"
    >
      <router-link :to="'/room/'+message.room_id">
        <div class="item--content">
          <div class="item--content__photo">
            <figure>
              <img :src="message.user.profile_image_url" :alt="message.user.name" />
            </figure>
          </div>
          <div class="item--content__section">
            <article class="item--content__upper">
              <h2 class="item--content__upper-name">{{ message.user.name }}</h2>
              <p class="item--content__upper-preview">{{ message.preview_message }}</p>
            </article>
            <article class="item--content__low">
              <p class="item--content__low-time">{{ message.created_at }}</p>
              <p
                v-if="message.unread_message > 0"
                class="item--content__low-unread"
              >{{ message.unread_message }}</p>
            </article>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { store } from '../../store/index'
import { mapActions } from 'vuex'

export default {
  name: 'item',
  store: store,
  props: {
    messages: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    ...mapActions(['insertChat'])
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 100%;
  height: 74px;
  &--content {
    display: flex;
    padding: 9px 16px;
    &__photo {
      & > figure {
        width: 56px;
        height: 56px;
        & > img {
          border-radius: 100%;
        }
      }
    }
    &__section {
      display: flex;
      padding: 9px 0;
      width: 100%;
      justify-content: space-between;
      margin-left: 15px;
    }
    &__upper {
      width: 80%;
      font-size: 0;
      &-name {
        padding-bottom: 6px;
        font: {
          size: 16px;
          weight: bold;
        }
      }
      &-preview {
        /* width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; */
        color: #a4a6b0;
        font: {
          size: 13px;
          weight:500;
        }
      }
    }
    &__low {
      width: 20%;
      font-size: 0;
      text-align: right;
      &-time {
        color: #363a42;;
        font: {
          size: 11px;
          weight: 500;
        }
      }
      &-unread {
        float: right;
        width: 18px;
        height: 18px;;
        margin-top: 8px;
        border-radius: 100%;
        background-color: #5b36ac;
        color: #fff;
        text-align: center;
        line-height: 1.8;
        font: {
          size: 10px;
          weight: bold;
        }
      }
    }
  }
  &:last-child {
    padding-bottom: 0;
  }
}
</style>
