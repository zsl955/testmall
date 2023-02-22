<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control v-show="isTabFixed" id="tabControl1" ref="tabControl1"
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick">
    </tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <FeatureView></FeatureView>
        <tab-control ref="tabControl2"
          :titles="['流行','新款','精选']" 
          @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';


  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home.js';
  import BackTop from '../../components/content/backTop/BackTop.vue';
  // import {Swiper, SwiperItem} from 'components/common/swiper'
    import {
    debounce
  } from 'common/utils.js'

  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data(){
      return{
        banners:[],
        recommends:[],
        result: null,
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType: 'pop',
        isBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.scroll.refresh)
      this.$bus.$on('itemImageLoad',()=>{
        this.$refs.scroll.scroll.refresh()
      })
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0,-this.saveY,0)
      this.$refs.scroll.scroll.refresh()
      console.log('activated' + this.saveY);
    },
    deactivated() {
      this.saveY = -(this.$refs.scroll.scroll.y)
      console.log('deactivated'+this.$refs.scroll.scroll.y);
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
       tabClick(index){
        console.log(index);
        switch(index){
          case 0:this.currentType='pop'; break;
          case 1:this.currentType = 'new'; break;
          case 2: this.currentType = 'sell'; break;

        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
       },
       backTopClick(){

        this.$refs.scroll.scrollTo(0,0,100)
        console.log('..........'+ this.$refs.scroll);
       },
       loadMore(){
        this.getHomeGoods(this.currentType)
        console.log('上拉一波');
        this.$refs.scroll.scroll.refresh()
       },

       contentScroll(position){

        this.isBackTop = -position.y > 1000
        // console.log(position);

        this.isTabFixed = (-position.y) > this.tabOffsetTop
       },

       swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
       },


      /**
       * 网络请求
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res=>{
          console.log(res);
          this.goods[type].list.push(...(res.data.list));
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  #tabControl1{
    position: relative;
    z-index: 9;
  }


  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

</style>
