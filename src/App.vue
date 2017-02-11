<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/sell/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sell/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sell/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import urlParse from './common/js/util';
  import vHeader from './components/header/header';

  const ERR_OK = 0;

  export default {
    name: 'app',
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })(),
        },
      };
    },
    mounted() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
          console.log(this.seller);
        }
      });
    },
    components: {
      vHeader,
    },
  };
</script>

<style>
  @import "./common/style/font.css";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
    .tab::after {
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 1px solid rgba(7, 17, 27, .1);
      content: '';
      width: 100%;
      transform: scaleY(0.7);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .tab::after {
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 1px solid rgba(7, 17, 27, .1);
      content: '';
      width: 100%;
      transform: scaleY(0.5);
    }
  }


  .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab-item a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .tab-item a.active {
    color: rgb(230, 20, 20);
  }
</style>
