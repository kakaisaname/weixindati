<template>
  	<div class="home_container">
          <!--father-component 给子组件传数据-->
        <itemcontainer father-component="home"></itemcontainer>
    </div>
</template>

<script>
import itemcontainer from '../../components/itemcontainer'

export default {
	name: 'home',
  	components: {
  		itemcontainer
  	},
    created(){
        
    }
}
</script>

<style lang="less" scoped>
    .home_container{

    }
</style>