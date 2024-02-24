<template>
	<view>
		<view class="star">
			<uni-section title="你的最终得分:" subTitle="每颗⭐将自动转化为100积分" padding>
				<uni-rate :readonly="true" :value="countStart()" />
			</uni-section>
		</view>
		<!-- 题解 -->
		<view v-for="(item,index) in questionData" :key="index">
			<uni-card :title="item.question" :extra="'正确选项:'+getChoose(item.answer)">
				<uni-data-checkbox :value="myChoose[index]" :localdata="item.options" @change="change"
					:selectedColor="myChoose[index]===item.answer?'#10d169':'#ee0515' "></uni-data-checkbox>
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
				userId: 0,
				myChoose: [],
				questionData: [],
				range: [],
				answer: [],
				questionIds: [],
				type: 0,
				difficulty: 0
			}
		},
		onLoad(options) {

			this.type = options.type
			this.difficulty = options.difficulty
			uni.getStorage({
				key: 'TEST_MYCHOOSE',
				success: (res) => {
					this.myChoose = res.data
				}
			})
			uni.getStorage({
				key: 'QUESTIONDATA',
				success: (res) => {
					this.questionData = res.data
				}
			})
			uni.getStorage({
				key: 'USERINFO_OPENID',
				success: (res) => {
					this.getUserInfo(res.data)
				}
			})
		},
		onReady() {
			// this.saveAnswerSheet()
		},
		methods: {
			async getUserInfo(openId) {
				const res = await this.$myRequest({
					url: '/user/getByOpenId?openId=' + openId
				})
				this.userId = res.data.data.id
				console.log(res.data.data.id)
				this.saveAnswerSheet(res.data.data.id)
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
			countStart() {
				var star = 0
				for (var i = 0; i < this.questionData.length; i++) {
					if (this.questionData[i].answer == this.myChoose[i]) {
						star++
					}
					this.answer[this.answer.length] = this.questionData[i].answer
					this.questionIds[this.questionIds.length] = this.questionData[i].id
				}
				return star
			},
			clickReturn() {
				uni.navigateBack({
					url: '/pages/test_collection/test_collection'
				})
			},
			async saveAnswerSheet(userId) {
				await this.$myRequest({
					url: '/user/saveAnswer',
					method: 'POST',
					data: {
						userId: userId,
						questionIds: this.questionIds,
						userAnswer: this.myChoose,
						rightAnswer: this.answer,
						type: this.type,
						difficulty: this.difficulty
					}
				})
			}
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
