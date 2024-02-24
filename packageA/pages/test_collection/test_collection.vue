<template>
	<view class="test_collection">
		<view class="choose">
			<view class="card" @click="clickCard(0)">简单难度</view>
			<view class="card" @click="clickCard(1)">中等难度</view>
			<view class="card" @click="clickCard(2)">困难难度</view>
		</view>

		<view class="content">
			<uni-card title="温馨提示:" extra="额外信息">
				<text class="uni-body">
					每次测试共五题，您将有两分钟的时间作答，全部题目完成后可查看正确答案以及分数
				</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
			};
		},
		onLoad(options) {
			this.type = options.type
		},
		methods: {
			clickCard(sele) {
				uni.navigateTo({
					url: '/packageA/pages/test/test?type=' + sele + '&num=0&examType='+this.type
				})
			}
		}
	}
</script>

<style lang="scss">
	.test_collection {

		.card {
			height: 200rpx;
			position: relative;
			color: #fff;
			font-size: 50rpx;
			border: 2px solid gold;
			border-radius: 10px;
			background: #10d169;
			transition: all .3s;
			margin: 30rpx;
			margin-top: 60rpx;
			line-height: 200rpx;
			text-align: center;
		}

		.card::before {
			content: "";
			position: absolute;
			top: -10px;
			left: -10px;
			right: -10px;
			bottom: -10px;
			border: 2px solid #10d169;
			border-radius: 10px;
			animation: cardAni 3s infinite linear;
		}

		.card::after {
			content: "";
			position: absolute;
			top: -10px;
			left: -10px;
			right: -10px;
			bottom: -10px;
			border: 2px solid #ffd700;
			border-radius: 10px;
			animation: cardAni 3s infinite linear;

		}

		@keyframes cardAni {

			0%,
			100% {
				clip-path: inset(0 0 98% 0);
			}

			25% {
				clip-path: inset(0 98% 0 0);
			}

			50% {
				clip-path: inset(98% 0 0 0);
			}

			75% {
				clip-path: inset(0 0 0 98%);
			}
		}

		.card::after {
			animation: cardAni 3s infinite -1.5s linear;
		}

	}
</style>
