<template>
  	<section>
    	<header class="top_tips">
    		<span class="num_tip" v-if="fatherComponent == 'home'">{{level}}</span>
    		<span class="num_tip" v-if="fatherComponent == 'item'">题目{{itemNum}}</span>
    	</header>
    	<div v-if="fatherComponent == 'home'" >
    		<div class="home_logo item_container_style"></div>
    		<router-link to="item" class="start button_style" ></router-link>
    	</div>
    	<div v-if="fatherComponent == 'item'" > <!--进入题目页面-->
    		<div class="item_back item_container_style">
    			<div class="item_list_container" v-if="itemDetail.length >0"> <!--获取题目的数量-->
    				<header class="item_title">{{itemDetail[itemNum-1].topic_name}}    {{buttonName}}</header> <!--获取题目的标题-->
    				<ul>
    					<li  v-for="(item, index) of itemDetail[itemNum-1].topic_answer" :key="index" @click="choosed(index, item.topic_answer_id)" class="item_list">
    						<span class="option_style" v-bind:class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
    						<span class="option_detail">{{item.answer_name}}</span> <!--各个选项的值-->
    					</li>
    				</ul>
    			</div>
    		</div>
			<!--如果小于总页数-->
    		<span class="next_item button_style" @click="nextItem" v-if="itemNum < itemDetail.length"></span>

    		<span class="submit_item button_style" v-else @click="submitAnswer"></span>
    	</div>
  	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: 'itemcontainer',
	data() {
		return {
			itemId: null, //题目ID
			choosedNum: null, //选中答案索引
			choosedId:null, //选中答案id
			countdown:60,
			timerc: null,
			buttonName:''
		}
	},
  	props:['fatherComponent'],
  	computed: {
		  ...mapState([  //必须要有3个点
			  'itemNum', //第几题
			  'level', //第几周
			  'itemDetail', //题目详情
			  'timer', //计时器
			  ]),
		  			  
		  itemDetailLen() {
			//   return itemDetail.length
				return 5;
		  } 	  	  	
	},
	mounted () {
			this.countdown = 10;
			this.buttonName = "倒计时(" + this.countdown + ")";
			this.timerc = null;
			 if (!this.timerc) {
				this.timerc = setInterval(() => {
						if (this.countdown !== 0) {
							this.countdown--;
							this.buttonName = "倒计时(" + this.countdown + ")";
						} else {
							return false;
						}
				}, 1000)
        	}
	},
  	methods: {
  		...mapActions([
  			'addNum', 'initializeData',
  		]),
  		//点击下一题
  		nextItem(){
			clearInterval(this.timerc);
			this.countdown = 10;
			this.buttonName = "倒计时(" + this.countdown + ")";
			this.timerc = null;
			 if (!this.timerc) {
				this.timerc = setInterval(() => {
						if (this.countdown !== 0) {
							this.countdown--;
							this.buttonName = "倒计时(" + this.countdown + ")";
						} else {
							return false;
						}
				}, 1000)
        	} 
  			if (this.choosedNum !== null) {
	  			this.choosedNum = null;
	  			//保存答案, 题目索引加一，跳到下一题
	  			this.addNum(this.choosedId)
  			}else{
  				alert('您还没有选择答案哦')
  			}
  		},
  		//索引0-3对应答案A-B  *****************
	  	chooseType: type => {
	  		switch(type){
	  			case 0: return 'A';
	  			case 1: return 'B';
	  			case 2: return 'C';
	  			case 3: return 'D';
	  		}
	  	},
	  	//选中的答案信息
	  	choosed(type,id){
	  		this.choosedNum = type; //type 选中答案索引
	  		this.choosedId = id;	//选中题目的id
	  	},
	  	//到达最后一题，交卷，请空定时器，跳转分数页面
	  	submitAnswer(){
	  		if (this.choosedNum !== null) {
	  			this.addNum(this.choosedId)
	  			clearInterval(this.timer)
	  			this.$router.push('score')
  			}else{
  				alert('您还没有选择答案哦')
  			}
		  },
		 
	},
	created(){
		//初始化信息
		if(this.fatherComponent == 'home') {
			this.initializeData();
			document.body.style.backgroundImage = '@/assets/img/1-1.jpg';
		}
	}
}
</script>

<style lang="less">
	//本项目使用默认字号（16px）
	//3.25rem * 16 = 52px
	.top_tips{
		position: absolute; //生成绝对定位的元素，元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
		height: 7.35rem;    //高度
		width: 3.25rem;		//图片宽度
		top: -1.3rem;	    //向上减1.3rem 相当于height: 6.05rem;			
		right: 1.6rem;		//相对于右边界的距离
		background: url(../assets/images/WechatIMG2.png) no-repeat; //背景图
		background-size: 100% 100%; //规定背景图像的尺寸
		z-index: 10;
		.num_tip{
			position: absolute;  //必须为absolute，相对于top_tips来说
			left: 0.48rem;   	//距离图片左边0.48rem
			bottom: 1.1rem;	    //距离图片底部1.1rem	
			height: 0.7rem;		//距离top_tips底部的高度（也可以不要，设置bottom: 1rem;）	
			width: 2.5rem;		//文字宽度
			font-size: 0.6rem;	
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center; //文字居中
		}
	}
	.item_container_style{
		height: 11.625rem;    //图片的高度
		width: 13.15rem;	  //13.15rem 距离左边为13.15rem 
		background-repeat: no-repeat;
		position: absolute;
		top: 4.1rem;  		 //向下4.1rem
		left: 1rem;			 //距离左边1rem
	}
	
	.home_logo{
		background-image: url(../assets/images/1-2.png); //背景图片
		background-size: 13.142rem 100%;  //13.142rem 距离左边为13.142rem
		background-position: right center;  //定位
	}
	.item_back{	//背景图
		background-image: url(../assets/images/2-1.png);
		background-size: 100% 100%;
	}
	.button_style{
        display: block;
        height: 2.1rem; //按钮的高度
        width: 4.35rem;	//按钮宽度
        background-size: 100% 100%;
        position: absolute;
        top: 16.5rem;
        left: 50%; 			//正中间
        margin-left: -2.4rem; //向左靠点
        background-repeat: no-repeat;
	}
	.start{
        background-image: url(../assets/images/1-4.png);  //开始按钮图片
    }
    .next_item{  //下一题
		top: 25rem;
    	background-image: url(../assets/images/2-2.png);
    }
    .submit_item{ //提交按钮
    	background-image: url(../assets/images/3-1.png);
    }
    .item_list_container{
    	position: absolute;
    	height: 7.0rem;
    	width: 8.0rem;
    	top: 2.4rem;
		left: 3rem;
		-webkit-font-smoothing: antialiased;
    }
	.item_title{
		font-size: 0.65rem;
		color: #fff;
		line-height: 0.7rem;
	}
	.item_list{
		font-size: 2.5rem;  //增加选项间上下距离
		margin-top: 0.4rem;
		width: 20rem;
		span{
			display: inline-block;
			font-size: 0.6rem;
			color: #fff;
			vertical-align: middle;
		}
		.option_style{   //选项 小圆圈 单选按钮
			height: 0.725rem;
			width: 0.725rem;
			border: 1px solid #fff;
			border-radius: 50%;
			line-height: 0.725rem;
			text-align: center;
			margin-right: 0.3rem;
			font-size: 0.5rem;
			font-family: 'Arial';
		}
		.has_choosed{
			background-color: #ffd400;
			color: #575757;
			border-color: #ffd400;
		}
		.option_detail{
			font-size: 2rem;
			width: 10rem;
			padding-top: 0.11rem;
		}
	}
</style>
