<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @cart-add="cartAdd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from '../food/food';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object,
      },
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i += 1) {
          const height1 = this.listHeight[i];
          const height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        const foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      },
    },
    mounted() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHigh();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        const el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true,
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true,
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHigh() {
        const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i += 1) {
          const item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      cartAdd(el) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(el);
        });
      },
    },
    components: {
      shopcart,
      cartcontrol,
      food,
    },
  };
</script>

<style>
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }

  .goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

  .menu-wrapper .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    position: relative;
    padding: 0 12px;
  }

  .menu-item.current {
    position: relative;
    margin-top: -1px;
    z-index: 10;
    background: #fff;
    font-weight: 700;
  }

  .menu-item .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .menu-item .icon.decrease {
    background-image: url('decrease_3@2x.png');
  }

  .menu-item .icon.discount {
    background-image: url('discount_3@2x.png');
  }

  .menu-item .icon.guarantee {
    background-image: url('guarantee_3@2x.png');
  }

  .menu-item .icon.invoice {
    background-image: url('invoice_3@2x.png');
  }

  .menu-item .icon.special {
    background-image: url('special_3@2x.png');
  }

  .menu-wrapper .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
  }

  .menu-item::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, .1);
    content: '';
    width: 100%;
    transform: scaleY(0.7);
  }

  .goods .foods-wrapper {
    flex: 1;
  }

  .foods-wrapper .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }

  .foods-wrapper .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    position: relative;
  }

  .foods-wrapper .food-item::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, .1);
    content: '';
    width: 100%;
    transform: scaleY(0.7);
  }

  .foods-wrapper .food-item:last-child::after {
    display: none;
  }

  .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .food-item .content {
    flex: 1;
  }

  .food-item .content .name {
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .food-item .content .desc {
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food-item .content .extra {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .extra .count {
    margin-right: 12px;
  }

  .food-item .content .price {
    font-weight: 700;
    line-height: 24px;
  }

  .foods-wrapper .price .now {
    margin-right: 18px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .foods-wrapper .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food-item .content .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }

</style>
