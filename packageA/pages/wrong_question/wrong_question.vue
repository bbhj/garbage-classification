<template>
	<view class="wong">

		<view class="user_content">
			<view class="user_main">
				<view class="history_wrap">
					<navigator>
						<view class="his_num">{{reportData.totalNum}}</view>
						<view class="his_name">总次数</view>
					</navigator>
					<navigator>
						<view class="his_num">{{reportData.playNum}}</view>
						<view class="his_name">练习</view>
					</navigator>
					<navigator>
						<view class="his_num">{{reportData.testNum}}</view>
						<view class="his_name">测试</view>
					</navigator>
					<navigator>
						<view class="his_num">{{reportData.rightNum}}</view>
						<view class="his_name">正确题数</view>
					</navigator>
				</view>
			</view>
		</view>

		<view class="xxx">

		</view>
		<h1>类型</h1>
		<view class="charts-box">
			<qiun-data-charts type="pie" :chartData="reportData" />
		</view>

		<view class="card" v-for="(item,index) in list" :key="index">
			<view class="card-border-top">
			</view>
			<view class="img"><span>{{item.type==0?"练习":"测试"}}</span>
			</view>
			<span>正确题数：{{item.rightNum}}</span>
			<p class="job">{{item.commitTime | happenTimeFun}}</p>
			<button @click="clickBtn(item.examId)">查看
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reportData: {
					totalNum: 0,
					playNum: 0,
					testNum: 0,
					rightNum: 0,
					series: [],
				},
				userId: 0,
				list: []
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'USERID',
				success: (res) => {
					this.userId = res.data
					this.getList(res.data)
					this.getReportData(res.data)
				}
			})

		},
		filters: {
			happenTimeFun(num) { //时间戳数据处理
				let date = new Date(num);
				//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM; //月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h; //小时补0
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m; //分钟补0
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s; //秒补0
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			},
		},
		methods: {
			async getList(id) {
				const res = await this.$myRequest({
					url: '/user/listAnswer?userId=' + id
				})
				console.log(res)
				this.list = res.data.data
			},
			clickBtn(examId) {
				uni.navigateTo({
					url: '/packageA/pages/answer_sheet/answer_sheet_all?examId=' + examId
				})
			},
			async getReportData(id) {
				console.log(id)
				const res = await this.$myRequest({
					url: '/user/getReportData?id=' + id
				})
				console.log(res)
				this.reportData = res.data.data
			}
		}
	}
</script>

<style lang="scss">
	.wong {
		display: flex;
		flex-wrap: wrap;
		width: 750rpx;
		justify-content: space-evenly;


		.user_main {

			color: #666;
			position: absolute;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			// top: -40rpx;
			padding-bottom: 100rpx;
		}

		.history_wrap {
			background-color: #fff;
			display: flex;
		}

		navigator {
			flex: 1;
			text-align: center;
			padding: 10rpx 0;
		}

		.his_num {
			color: #10d169;

		}

		.xxx {
			height: 100rpx
		}

		.card {
			// width: 50%;
			box-sizing: border-box;
			width: 350rpx;
			height: 400rpx;
			background: #25b436;
			border-radius: 15px;
			box-shadow: 1px 5px 60px 0px #100a886b;
			// margin: 0;
			margin-top: 12rpx;
		}

		.card .card-border-top {
			width: 60%;
			height: 3%;
			background: #00af05;
			margin: auto;
			border-radius: 0px 0px 15px 15px;
		}

		.card span {
			font-weight: 600;
			color: white;
			text-align: center;
			display: block;
			padding-top: 10px;
			font-size: 16px;
		}

		.card .job {
			font-weight: 400;
			color: white;
			display: block;
			text-align: center;
			padding-top: 3px;
			font-size: 12px;
		}

		.card .img {
			width: 70px;
			height: 40px;
			background: #10d169;
			border-radius: 15rpx;
			margin: auto;
			margin-top: 25rpx;

		}

		.card button {
			padding: 8rpx 25rpx;
			display: block;
			border-radius: 8rpx;
			border: none;
			background: #10d169;
			margin-top: 20rpx;
			color: white;
			font-weight: 600;
			width: 40%;
			height: 80rpx;
			line-height: 80rpx;

		}

		.card button:hover {
			background: #36b11a;
		}
	}
</style>
