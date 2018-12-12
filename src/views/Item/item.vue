<template>
  	<div>
    	<itemlist></itemlist>
  	</div>
</template>

<script>
import itemlist from './itemlist'

export default {
	name: 'itemlist',
  	components: {
   		itemlist
  	},
  	created(){
      //进入题目页面，开始计时
  		this.$store.commit('REMBER_TIME');
  	}
}

</script>

<style lang="less">
    

</style>
