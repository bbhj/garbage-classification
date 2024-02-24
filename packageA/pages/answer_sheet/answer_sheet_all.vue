<template>
	<view>
		<view class="star">
			<uni-section title="你的最终得分:" subTitle="每颗⭐将自动转化为100积分" padding>
				<uni-rate :readonly="true" :value="countStart()" />
			</uni-section>
		</view>
		<!-- 题解 -->
		<view v-for="(item,index) in questionData" :key="index">
			<uni-card :title="item.question" :extra="'正确选项:'+getChoose(item.rightAnswer)">
				<uni-data-checkbox :value="item.userAnswer" :localdata="item.options" @change="change"
					:selectedColor="item.userAnswer===item.rightAnswer?'#10d169':'#ee0515' "></uni-data-checkbox>
			</uni-card>
		</view>
		<!-- 返回按钮 -->
		<button class="return-btn" @click="clickReturn()">返回</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// examId: 0
				questionData: [],

			}
		},
		onLoad(options) {
			this.getAnswer(options.examId)
		},
		methods: {
			async getAnswer(examId) {
				const res = await this.$myRequest({
					url: '/user/getAnswerByExamId?examId=' + examId
				})
				this.questionData = res.data.data
			},
			countStart() {
				var star = 0
				for (var i = 0; i < this.questionData.length; i++) {
					if (this.questionData[i].rightAnswer == this.questionData[i].userAnswer) {
						star++
					}
				}
				return star
			},
			getChoose(num) {
				switch (num) {
					case 0:
						return "A"
					case 1:
						return "B"
					case 2:
						return "C"
					case 3:
						return "D"
				}
			},
			clickReturn() {
				uni.navigateBack({
					url: '/pages/study/study'
				})
			},
		}
	}
</script>


<style lang="scss">
	/* From www.lingdaima.com */
	.return-btn {
		width: 300rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 15px 38px;
		border-radius: 16px;
		border: 1px solid transparent;
		color: #FFFFFF;
		background-color: #1DC9A0;
		font-size: 16px;
		letter-spacing: 1px;
		transition: all 0.15s linear;
		margin-bottom: 30rpx;
	}

	.return-btn:hover {
		background-color: rgba(29, 201, 160, 0.08);
		border-color: #1DC9A0;
		color: #1DC9A0;
		transform: translateY(-5px) scale(1.05);
	}

	.return-btn:active {
		background-color: transparent;
		border-color: #1DC9A0;
		color: #1DC9A0;
		transform: translateY(5px) scale(0.95);
	}

	.return-btn:disabled {
		background-color: rgba(255, 255, 255, 0.16);
		color: #8E8E93;
		border-color: #8E8E93;
	}
</style>
