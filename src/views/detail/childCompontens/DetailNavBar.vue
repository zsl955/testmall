<template>
    <div>
        <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" >
        </div>
        <div slot="center" class="title">
            <div v-for="(item,index) in titles" class="title-item" :class="{active: index == currentIndex}" @click="clickIndex(index)"> 
            {{item}}
            </div>
        </div>
        </nav-bar>
    </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';

//   import HomeSwiper from './childComps/HomeSwiper';
//   import RecommendView from './childComps/RecommendView';
//   import FeatureView from './childComps/FeatureView';


  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home.js';
//   import BackTop from '../../components/content/backTop/BackTop.vue';
  // import {Swiper, SwiperItem} from 'components/common/swiper'
    import {
    debounce
  } from 'common/utils.js'


export default {
    name: 'DetailNavBar',
    components: {
        NavBar,

    },
    data() {
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex:0
        };
    },

    mounted() {
        
    },

    methods: {
        clickIndex(index){
          this.currentIndex = index
        },
        backClick(){
          this.$router.back()
        }
    },
};
</script>

<style scoped>

    .title{
        display: flex;
        font-size: 13px;
    }

    .title-item{
      flex: 1;
    }
    .active{
      color: red
    }
    .back img{
      margin-top: 10px;
    }
</style>