<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <!-- <scroll class="content" ref="scroll"   :pull-up-load="true"> -->
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
        <goods-list :goods="recommends"></goods-list>
        <detail-bottom-bar class="bottom-bar"></detail-bottom-bar>
      <!-- </scroll> -->
    </div>
</template>

<script>
    import DetailNavBar from './childCompontens/DetailNavBar.vue';
    import DetailBottomBar from './childCompontens/DetailBottomBar.vue';
    import DetailSwiper from './childCompontens/DetailSwiper.vue';
    import DetailBaseInfo from './childCompontens/DetailBaseInfo.vue';
    import DetailShopInfo from './childCompontens/DetailShopInfo.vue';
    import DetailGoodsInfo from './childCompontens/DetailGoodsInfo.vue';
    import DetailParamInfo from './childCompontens/DetailParamInfo.vue';
    import DetailCommentInfo from './childCompontens/DetailCommentInfo.vue';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';

  import {
getDetail,Goods,Shop,GoodsParam,getRecommend
  } from 'network/detail.js';

//   import HomeSwiper from './childComps/HomeSwiper';
//   import RecommendView from './childComps/RecommendView';
//   import FeatureView from './childComps/FeatureView';
  // import {getDetail} from 'network/detail.js;


  import BackTop from 'components/content/backTop/BackTop.vue';
  // import {Swiper, SwiperItem} from 'components/common/swiper'
    import {
    debounce
  } from 'common/utils.js'
// import GoodsList from '../../components/content/goods/GoodsList.vue';
// import Scroll from '../../components/common/scroll/Scroll.vue';


export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        GoodsList,
        DetailBottomBar,
        BackTop



    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop:{},
            detailInfo: {},
            paramInfo:{},
            commentInfo:{},
            recommends: [],
            isBackTop: false,
        };
    },
    created() {
        this.iid = this.$route.params.iid;
        getDetail(this.iid).then(res=>{
          console.log(res);
          const data = res.result;
          this.topImages = data.itemInfo.topImages
          console.log

          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          this.shop = new Shop(data.shopInfo)
          // this.$refs.scroll.scroll.refresh();

          this.detailInfo = data.detailInfo;
          console.log("!!!!!!!!!!!"+this.detailInfo)
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
          getRecommend().then(res => {
            this.recommends = res.data.list
            console.log(res + '-----------------');
          })
        })


    },
    mounted() {
    },

    methods: {
        imageLoad(){
          console.log("----------");
          // this.$refs.scroll.scroll.refresh();
        }
    },
};
</script>

<style scoped>
  #detail{
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
  }
  /*.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }*/
  .bottom-bar{

  }
</style>