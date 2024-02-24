<template>
	<view class="test">
		<!-- 进度条 -->
		<view class="steps" @click="showDrawer('showLeft')">
			<uni-steps :options="steps" :active="active" activeColor="#10d169" activeIcon="closeempty" />
		</view>
		<!-- 倒计时 -->
		<view class="time">
			<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" showDay="false"
				:minute="minute" :second="second" @timeup="timeUp()"></uni-countdown>
		</view>


		<uni-card :cover="cover" isShadow>
			<template v-slot:title>
				<uni-list>
					<uni-list-item :title="questions[active].title" />
				</uni-list>
			</template>
			<image slot='cover' style="width: 100%; height: 540rpx;" :src="cover"></image>
			<rich-text :nodes="'<h4>'+question+'</h4>'"></rich-text>
			<!-- 选项 -->
			<uni-data-checkbox v-model="myChoose[active]" :localdata="range" @change="change" selectedColor="#10d169">
			</uni-data-checkbox>
			<!-- 上一题 收藏 下一题 -->
			<view class="uni-padding-wrap uni-common-mt">
				<view class="next-pre-btn">
					<button plain type="primary" @click="onClickItem(0)">上一题</button>
					<button class="star-btn" @click="onClickItem(1)">⭐</button>
					<button plain type="primary" @click="onClickItem(2)">{{active==4?'交卷':'下一题'}}</button>
				</view>

			</view>
		</uni-card>

		<!-- 抽屉 -->
		<uni-drawer ref="showLeft" mode="left" :width="320" @change="changeDrawer($event,'showLeft')">
			<view class="close">
				<button @click="closeDrawer('showLeft')" type="primary"><text class="word-btn-white">收起</text></button>
			</view>
			<view class="btn">
				<button v-for="item in questions" @click="clickDrawerBtn(item.id)" :key="item.id"
					:class="item.id==active?'q_btn_activ':'q_btn'">
					{{item.title}}
				</button>
			</view>
		</uni-drawer>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				minute: 2,
				second: 0,
				questionTitle: '第 1 题',
				questionData: [],
				questions: [{ //抽屉显示
						id: 0,
						title: '第 1 题'
					},
					{
						id: 1,
						title: '第 2 题'
					},
					{
						id: 2,
						title: '第 3 题'
					},
					{
						id: 3,
						title: '第 4 题'
					},
					{
						id: 4,
						title: '第 5 题'
					}
				],
				showLeft: false,
				value: 0,
				range: [],
				question: '', //题目
				styleType: 'button',
				current: 1, //选中收藏
				activeColor: '#4cd964',
				items: ['上一题', '⭐', '下一题'],
				cover: '',
				type: 1,
				active: 0, //当前题数（上方进度条 | 下方显示）
				steps: [{
						title: '①'
					},
					{
						title: '②'
					},
					{
						title: '③'
					},
					{
						title: '④'
					},
					{
						title: '⑤'
					},
				],
				myChoose: [0, 0, 0, 0, 0],
				examType: 0,
				userId: 0
			}
		},
		onLoad(options) {
			this.type = options.type
			this.examType = options.examType
			this.findQuestionsByType(options.type)
			this.active = options.num
			uni.getStorage({
				key: 'INDEX_TO_STUDY_TYPRID',
				success: (res) => {
					this.userId = res.data
				}
			})
		},
		methods: {
			async findQuestionsByType(type) {
				console.log(type)
				const res = await this.$myRequest({
					url: '/question/findQuestionsByType?type=' + type
				})
				console.log(res)
				this.questionData = res.data.data
				this.cover = res.data.data[this.active].imgUrl
				this.question = res.data.data[this.active].question
				this.range = res.data.data[this.active].options
				uni.setStorage({
					key: 'QUESTIONDATA',
					data: res.data.data
				})
			},
			timeUp() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '作答时间已结束',
					showCancel: 'false',
					confirmText: '交卷',
					success: (res) => {
						uni.setStorage({
							key: 'TEST_MYCHOOSE',
							data: this.myChoose,
							success() {
								uni.redirectTo({
									url: '/packageA/pages/answer_sheet/answer_sheet?type=' +
										that.examType + "&difficulty=" + that.type
								})
							}
						})


					}
				})
			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			changeDrawer(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			//点击选项
			change(e) {
				console.log('e:', e);
				/* uni.setStorage({
					key: 'TEST_QUESTION_NUM_' + this.active,
					data: e.detail.value
				}) */
			},
			cilckPagination(e) {
				if (e.type === "next") {
					console.log("点击下一页")
				} else {
					console.log("点击上一页")

				}
			},
			onClickItem(e) {

				// switch (e.currentIndex) {
				switch (e) {
					case 0:
						this.goPreQue()
						break
					case 1:
						this.favorites()
						break
					case 2:
						this.goNextQue()
						break
				}


			},

			async favorites() {
					
				const res = await this.$myRequest({
					url: '/favorites/updateStatus',
					data: {
						userId: this.userId,
						questionId: this.questionData[this.active].id
					},
					method: 'POST'
				})
				uni.showToast({
					title: res.data.data == 1 ? '收藏成功！' : '取消收藏!',
					icon: 'none'
				})
				
				// uni.request({
				// 	url: 'http://localhost:8080/favorites/updateStatus',
				// 	data: {
				// 		userId: this.userId,
				// 		questionId: this.questionData[this.active].id
				// 	},
				// 	method: 'POST',
				// 	success: (res) => {
				// 		uni.showToast({
				// 			title: res.data.data == 1 ? '收藏成功！' : '取消收藏!',
				// 			icon: 'none'
				// 		})
				// 	}
				// })
			},

			goPreQue() {
				var num = this.active
				if (num <= 0) {
					uni.showToast({
						title: '没有上一题啦~',
						icon: 'none'
					})
				} else {
					/* uni.redirectTo({
						url: '/pages/test/test?type=' + this.type + '&num=' + (this.active - 1)
					}) */
					num--
					this.cover = this.questionData[num].imgUrl
					this.question = this.questionData[num].question
					this.range = this.questionData[num].options
					this.active = num
				}

			},
			goNextQue() {
				var num = this.active
				if (num < 4) {
					num++
					/* uni.redirectTo({
						url: '/pages/test/test?type=' + this.type + '&num=' + num
					}) */

					this.cover = this.questionData[num].imgUrl
					this.question = this.questionData[num].question
					this.range = this.questionData[num].options
					this.active = num
				} else {
					let that = this
					uni.showModal({
						title: '是否确认交卷',
						content: '交卷后将无法再次修改选项',
						success: (res) => {
							if (res.confirm) {
								uni.setStorage({
									key: 'TEST_MYCHOOSE',
									data: this.myChoose,
									success() {
										uni.redirectTo({
											url: '/packageA/pages/answer_sheet/answer_sheet?type=' +
												that.examType + "&difficulty=" + that.type
										})
									}
								})

							} else if (res.cancel) {
								console.log('用户点击了取消')
							}
						}
					})
				}

			},
			clickDrawerBtn(num) {
				this.cover = this.questionData[num].imgUrl
				this.question = this.questionData[num].question
				this.range = this.questionData[num].options
				this.active = num
				this.closeDrawer('showLeft')
			}
		}
	}
</script>

<style lang="scss">
	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 30px;

		.next-pre-btn {
			display: flex;

			.star-btn {
				background-color: #10d169;
				border: 2px solid #10d169;
			}

			button {
				font-size: 32rpx;
				border-color: #10d169;
			}
		}
	}

	.time {
		display: flex;
		align-items: center;

		uni-countdown {
			margin-left: 200rpx;
		}
	}

	.close {
		padding: 10px;
	}

	.btn {
		margin-left: 30rpx;

		.q_btn {
			position: relative;
			padding: 10px 40px;
			margin: 0px 10px 10px 0px;
			float: left;
			border-radius: 3px;
			font-size: 20px;
			color: #FFF;
			text-decoration: none;
			background-color: #2ecc71;
			border: none;
			border-bottom: 5px solid #27ae60;
			text-shadow: 0px -2px #27ae60;
			-webkit-transition: all 0.1s;
			transition: all 0.1s;
		}

		.q_btn_activ {
			position: relative;
			padding: 10px 40px;
			margin: 0px 10px 10px 0px;
			float: left;
			border-radius: 3px;
			font-size: 20px;
			color: #FFF;
			text-decoration: none;
			background-color: #10bdcc;
			border: none;
			border-bottom: 5px solid #2b92ae;
			text-shadow: 0px -2px #4c8ae6;
			-webkit-transition: all 0.1s;
			transition: all 0.1s;
		}
	}
</style>
