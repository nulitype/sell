<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect ref="ratingselect" :select-type="selectType" :desc="desc" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import formatDate from '../../common/js/date';

  const ALL = 2;
  // const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object,
      },
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意',
        },
      };
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        }
        return type === this.selectType;
      },
    },
    mounted() {
      this.$http.get('/sell/data.json').then((response) => {
        response = response.body;
        // if (response.errno === ERR_OK) {
        this.ratings = response.ratings;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true,
          });
        });
        // }
      });
      this.$nextTick(() => {
        this.$refs.ratingselect.$on('eventSelectType', (type) => {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        });
      });
      this.$nextTick(() => {
        this.$refs.ratingselect.$on('eventToggle', (content) => {
          this.onlyContent = content;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        });
      });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      },
    },
    components: {
      star,
      split,
      ratingselect,
    },
  };
</script>

<style>
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .ratings .overview {
    display: flex;
    padding: 18px 0;
  }

  .ratings .overview .overview-left {
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, .1);
    text-align: center;
    padding: 6px 0;
  }

  @media only screen and (max-width: 320px) {
    .ratings .overview .overview-left {
      flex: 0 0 120px;
      width: 120px;
      border-right: 1px solid rgba(7, 17, 27, .1);
      text-align: center;
      padding: 6px 0;
    }
  }

  .ratings .overview .overview-left .score {
    margin-bottom: 6px;
    font-size: 24px;
    color: rgb(255, 153, 0);
    line-height: 28px;
  }

  .ratings .overview .overview-left .title {
    margin-bottom: 8px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 12px;
  }

  .ratings .overview .overview-left .rank {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
  }

  .ratings .overview .overview-right {
    flex: 1;
    padding: 6px 0 6px 24px;
  }

  @media only screen and (max-width: 320px) {
    .ratings .overview .overview-right {
      flex: 1;
      padding-left: 6px;
    }
  }

  .ratings .overview .overview-right .score-wrapper {
    line-height: 18px;
    margin-bottom: 8px;
    font-size: 0;
  }

  .ratings .overview .overview-right .score-wrapper .title {
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    color: rgb(7, 17, 27);
    line-height: 18px;
  }

  .ratings .overview .overview-right .score-wrapper .star {
    display: inline-block;
    vertical-align: top;
    margin: 0 12px;
  }

  .ratings .overview .overview-right .score-wrapper .score {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    color: rgb(255, 153, 0);
    line-height: 18px;
  }

  .ratings .overview .overview-right .delivery-wrapper {
    font-size: 0;
  }

  .ratings .overview .overview-right .delivery-wrapper .title {
    font-size: 12px;
    line-height: 18px;
    color: rgb(7, 17, 27);
  }

  .ratings .overview .overview-right .delivery-wrapper .delivery {
    margin-left: 12px;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }

  .ratings .rating-wrapper {
    padding: 0 18px;
  }

  .ratings .rating-wrapper .rating-item {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .ratings .rating-wrapper .rating-item .avatar {
    flex: 0 0 28px;
    margin-right: 12px;
  }

  .ratings .rating-wrapper .rating-item .avatar img {
    border-radius: 50%;
  }

  .ratings .rating-wrapper .rating-item .content {
    position: relative;
    flex: 1;
  }

  .ratings .rating-wrapper .rating-item .content .name {
    line-height: 12px;
    margin-bottom: 4px;
    font-size: 10px;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper {
    margin-bottom: 6px;
    font-size: 0;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper .star {
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
  }

  .ratings .rating-wrapper .rating-item .content .text {
    line-height: 18px;
    font-size: 12px;
    margin-bottom: 18px;
  }

  .ratings .rating-wrapper .rating-item .content .recommend {
    line-height: 16px;
    font-size: 0;
  }

  .ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up,
  .ratings .rating-wrapper .rating-item .content .recommend .item {
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
  }

  .ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up {
    color: rgb(0, 160, 220);
  }

  .ratings .rating-wrapper .rating-item .content .recommend .item {
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, .1);
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background: #fff;
  }

  .ratings .rating-wrapper .rating-item .content .time {
    position: absolute;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    top: 0;
    right: 0;
  }

</style>
