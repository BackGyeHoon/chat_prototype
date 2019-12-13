<template>
  <div>
    <ZHeader :isList="true"/>
    <Zlist :messages="returnMessageData"/>
  </div>
</template>

<script>
import ZHeader from '@/components/layouts/Header'
import Zlist from '@/components/list/Item'
// import { mapState } from '../store'

export default {
  name: 'list',
  components: {
    ZHeader,
    Zlist
  },
  data () {
    return {
      returnMessageData: [],
      messageDataArr: [],
      userDataArr: []
    }
  },
  mounted () {
    this.catchUsedMessageData()
    this.catchUserInfoData()
    // this.mergeMessageData()
  },
  methods: {
    async getUsedMessageData () {
      const getMessageData = await require('../api/usedMessageData.json')
      return new Promise((resolve, reject) => {
        if (getMessageData) {
          resolve(getMessageData)
        } else {
          reject(alert('메세지 리스트 데이터가 존재하지 않습니다.'))
        }
      })
    },
    async getUserInfoData () {
      const getUserData = await require('../api/userInfoData.json')
      return new Promise((resolve, reject) => {
        if (getUserData) {
          resolve(getUserData)
        } else {
          reject(alert('회원 데이터를 가져오지 못했습니다.'))
        }
      })
    },
    catchUserInfoData () {
      this.getUserInfoData().then((resolveData) => {
        this.userDataArr = resolveData.userInfoData
      })
    },
    catchUsedMessageData () {
      this.getUsedMessageData().then((resolveData) => {
        this.messageDataArr = resolveData.usedMessageData
      })
    }
  }
}
</script>
