<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[index]"></span>
            <span class="text">{{ item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </ul>
      </div>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';
  import { saveToLocal, loadFromLocal } from '../../common/js/store';


  export default {
    props: {
      seller: {
        type: Object,
      },
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })(),
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      },
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted() {
      console.log(this.seller.id);
      this.initScorll();
      this.initPics();
    },
    watch: {
      'seller'() {
        this.initScorll();
        this.initPics();
      },
    },
    methods: {
      initScorll() {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true,
            });
          });
        } else {
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      },
      initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScoll) {
              this.picScoll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical',
                click: true,
              });
            } else {
              this.picScoll.refresh();
            }
          });
        }
      },
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
    },
    components: {
      star,
      split,
    },
  };
</script>

<style>
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .seller .overview {
    padding: 18px;
    position: relative;
  }

  .seller .overview .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .overview .desc {
    font-size: 0;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .overview .desc .star {
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
  }

  .seller .overview .desc .text {
    margin-right: 12px;
    line-height: 18px;
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(77, 85, 93);
  }

  .seller .overview .remark {
    display: flex;
    padding-top: 18px;
  }

  .seller .overview .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .overview .remark .block:last-child {
    border: none;
  }

  .seller .overview .remark h2 {
    margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
  }

  .seller .overview .remark .content {
    line-height: 24px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }

  .seller .overview .remark .content .stress {
    font-size: 24px;
  }

  .seller .overview .favorite {
    position: absolute;
    right: 11px;
    top: 18px;
    text-align: center;
    width: 50px;
  }

  .seller .overview .favorite .icon-favorite {
    display: block;
    color: #d4d6d9;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 4px;
  }

  .seller .overview .favorite .icon-favorite.active {
    color: rgb(240, 20, 20);
  }

  .seller .overview .favorite .text {
    line-height: 10px;
    font-size: 10px;
    color: rgb(77, 85, 93);
  }



  .seller .bulletin {
    padding: 18px 18px 0 18px;
  }

  .seller .bulletin .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .bulletin .content-wrapper {
    padding: 0 12px 16px 12px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .bulletin .content-wrapper .content {
    line-height: 24px;
    font-size: 12px;
    color: rgb(240, 20, 20);
  }

  .seller .bulletin .supports .support-item {
    padding: 16px 12px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .bulletin .supports .support-item:last-child {
    border: none;
  }

  .seller .support-item .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  .seller .support-item .icon.decrease {
    background-image: url('decrease_4@2x.png');
  }

  .seller .support-item .icon.discount {
    background-image: url('discount_4@2x.png');
  }

  .seller .support-item .icon.guarantee {
    background-image: url('guarantee_4@2x.png');
  }

  .seller .support-item .icon.invoice {
    background-image: url('invoice_4@2x.png');
  }

  .seller .support-item .icon.special {
    background-image: url('special_4@2x.png');
  }

  .seller .support-item .text {
    line-height: 16px;
    font-size: 12px;
  }

  .seller .pics {
    padding: 18px;
  }

  .seller .pics .title {
    margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .pic-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .seller .pic-wrapper .pic-list {
    font-size: 0;
  }

  .seller .pic-wrapper .pic-list .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
  }

  .seller .info {
    padding: 18px 18px 0 18px;
  }

  .seller .info .title {
    padding-bottom: 12px;
    line-height: 14px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .info .info-item {
    padding: 16px 12px;
    font-size: 16px;
    border-bottom: 1px solid rgb(7, 17 ,27);
    color: rgb(7, 17, 27);
  }

  .seller .info .info-item:last-child {
    border: none;
  }

</style>
