<template>
  <ul class="list">
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
              <p class="item--content__upper-preview">{{ message.resource_id ? '사진을 보냈습니다.' : message.preview_message }}</p>
            </article>
            <article class="item--content__low">
              <p class="item--content__low-time">{{ message.updated_at | moment }}</p>
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
import moment from 'moment'

export default {
  name: 'item',
  props: {
    messages: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    moment: function (date) {
      return moment(date)
    },
    date: function (date) {
      return moment(date).format('h:mm')
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('h:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: 1rem;
}
.item {
  display: inline-block;
  width: 100%;
  height: 7.4rem;
  &--content {
    display: flex;
    padding: .9rem 1.6rem;
    &__photo {
      position: relative;
      & > figure {
        width: 5.6rem;
        height: 5.6rem;
        & > img {
          border-radius: 100%;
        }
      }
      animation: itemPhoto 0.61s;
      @keyframes itemPhoto {
        0% {
          opacity: 0;
          right: 100%;
        }
        100% {
          opacity: 1;
          right: 0;
        }
      }
    }
    &__section {
      position: relative;
      display: flex;
      padding: .9rem 0;
      width: 100%;
      justify-content: space-between;
      margin-left: 1.5rem;
      animation: itemView 0.5s;
      @keyframes itemView {
        0% {
          opacity: 0;
          left: 100%;
        }
        100% {
          opacity: 1;
          left: 0;
        }
      }
    }
    &__upper {
      width: 80%;
      font-size: 0;
      &-name {
        padding-bottom: .6rem;
        font: {
          size: 1.6rem;
          weight: bold;
        }
      }
      &-preview {
        width: 23rem;
        white-space: nowrap;
        overflow: hidden;
        word-wrap: normal;
        text-overflow: ellipsis;
        color: #a4a6b0;
        font: {
          size: 1.3rem;
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
          size: 1.1rem;
          weight: 500;
        }
      }
      &-unread {
        float: right;
        width: 1.8rem;
        height: 1.8rem;
        margin-top: .8rem;
        border-radius: 100%;
        background-color: #5b36ac;
        color: #fff;
        text-align: center;
        line-height: 1.8;
        font: {
          size: 1rem;
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
