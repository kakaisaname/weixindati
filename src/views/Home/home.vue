<template>
  	<div class="home_container">
          <!--father-component 给子组件传数据-->
        <!-- <itemcontainer father-component="home"></itemcontainer> -->
        <start></start>
    </div>
</template>

<script>
// import itemcontainer from '../../components/itemcontainer'
import start from './start'

export default {
	name: 'home',
  	components: {
  		start
  	},
    created(){
        
    }
}
</script>

<style lang="less" scoped>
    .home_container{

    }
</style>