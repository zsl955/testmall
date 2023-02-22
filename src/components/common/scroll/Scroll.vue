<template>
 <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
 export default {
    name: "Scroll",
   data () {
     return {
        scroll: null,
        default : 0
     }
   },
   props:{
      probeType:{
         type:Number,

      },
      pullUpLoad:{
         type: Boolean,
         default: false
      }
   },
   components: {

   },
   mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType,
      mouseWheel:true,
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll', position);
      // console.log(position);
    })

    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多')
      this.$emit('pullingUp');
    })



   },
   methods: {
      scrollTo(x,y,time =300){
         console.log('!!!!!!'+this.scroll);
         this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
         this.scroll && this.scroll.finishPullUp()
      }
   },
 }
</script>

<style>

 
</style>
