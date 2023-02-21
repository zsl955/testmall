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
        scroll: null
     }
   },
   components: {

   },
   mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: 3,
      mouseWheel:true
    })
   //  this.scroll.scrollTo(0,0)
   },
   methods: {
      scrollTo(x,y,time =300){
         console.log('!!!!!!'+this.scroll);
         this.scroll.scrollTo(x,y,time);
      }
   },
 }
</script>

<style>

 
</style>
