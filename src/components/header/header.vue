<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description}}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail()">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon" :class="classMap[index]"></span>
              <span class="text">{{ item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail()">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
  import star from 'components/star/star';

  export default {
    props: {
      seller: {
        type: Object,
      },
    },
    data() {
      return {
        detailShow: false,
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      },
    },
    mounted() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star,
    },
  };
</script>

<style>
  .clearfix {
    display: inline-block;
  }

  .clearfix::after {
    content: '';
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }

  .header {
    color: #fff;
    line-height: 1;
    font-weight: 200;
    font-family: "PingFang SC", "Helvetica-Light", arial, sans-serif;
    position: relative;
    background: rgba(7, 17, 27, .5);
  }

  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }

  .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .avatar img {
    border-radius: 2px;
  }

  .header .content-wrapper .content {
    display: inline-block;
    font-size: 0px;
    margin-left: 16px;
  }

  .content .title {
    margin: 2px 0 8px 0;
  }

  .brand {
    display: inline-block;
    width: 30px;
    height: 18px;
    background: url('brand@2x.png') no-repeat;
    background-size: 30px 18px;
    vertical-align: top;
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    .brand {
      display: inline-block;
      width: 30px;
      height: 18px;
      background: url('brand@3x.png') no-repeat;
      background-size: 30px 18px;
      vertical-align: top;
    }
  }

  .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }

  .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }

  .support .icon.decrease {
    background-image: url('decrease_1@2x.png');
  }

  .support .icon.discount {
    background-image: url('discount_1@2x.png');
  }

  .support .icon.guarantee {
    background-image: url('guarantee_1@2x.png');
  }

  .support .icon.invoice {
    background-image: url('invoice_1@2x.png');
  }

  .support .icon.special {
    background-image: url('special_1@2x.png');
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    .support .icon.decrease {
      background-image: url('decrease_1@3x.png');
    }
    .support .icon.discount {
      background-image: url('discount_1@3x.png');
    }
    .support .icon.guarantee {
      background-image: url('guarantee_1@3x.png');
    }
    .support .icon.invoice {
      background-image: url('invoice_1@3x.png');
    }
    .special {
      background-image: url('special_1@3x.png');
    }
  }

  .support .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  .support .text {
    line-height: 12px;
    font-size: 10px;
  }

  .support-count {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, .2);
    text-align: center;
  }

  .count {
    font-size: 10px;
    vertical-align: top;
  }

  .support-count .icon-keyboard_arrow_right {
    font-size: 10px;
    margin-left: 2px;
    vertical-align: middle;
  }

  .bulletin-wrapper {
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background: rgba(7, 17, 27, 0.2);
  }

  .bulletin-title {
    display: inline-block;
    width: 22px;
    height: 12px;
    background: url('bulletin@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: top;
    margin-top: 7px;
  }

  .bulletin-text {
    font-size: 10px;
    margin: 0 4px;
    vertical-align: top;
  }

  .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 9px;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .header .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);
  }

  .header .detail.fade-enter-active, .header .detail.fade-leave-active {
    transition: all .5s;
  }
  .header .detail.fade-enter, .header .detail.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

  .detail-wrapper {
    min-height: 100%;
    width: 100%;
  }

  .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }

  .detail-main .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }

  .detail .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }

  .detail-main .title {
    width: 80%;
    margin: 28px auto 24px auto;
    display: flex;
  }

  .detail-main .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .detail-main .title .text {
    padding: 0 12px;
    font-size: 14px;
  }

  .detail-main .supports {
    width: 80%;
    margin: 0 auto;
  }

  .detail-main .supports .support-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }

  .detail-main .supports .support-item:last-child {
    margin-bottom: 0;
  }

  .detail-main .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .detail-main .icon.decrease {
    background-image: url('decrease_2@2x.png');
  }

  .detail-main .icon.discount {
    background-image: url('discount_2@2x.png');
  }

  .detail-main .icon.guarantee {
    background-image: url('guarantee_2@2x.png');
  }

  .detail-main .icon.invoice {
    background-image: url('invoice_2@2x.png');
  }

  .detail-main .icon.special {
    background-image: url('special_2@2x.png');
  }

  .detail-main .text {
    line-height: 16px;
    font-size: 12px;
  }

  .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;
  }

  .detail-main .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }

  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
</style>
