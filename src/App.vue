<template>
	<div class="page">

		<div class="header container">
			<div class="row">
				<div class="col">
					<div class="header__inner">
						<div class="container">
							<div class="row">
								<div class="col">
									<h1 class="header__title">Пользователи IQTEK</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="panel page__panel">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-4">
						<div class="panel__part panel-part">
							<div class="container py-4 panel-part__block">
								<div class="row">

									<div class="col-8">
										<input
											type="text"
											v-model="newUserInput"
											class="control-element control-element__input-text"
											placeholder="Имя пользователя"
										>
									</div>

									<div class="col-4">
										<button
											@click="newUserAction"
											class="control-element control-element__button"
										>Добавить
										</button>
									</div>

								</div>
							</div>
							<div class="panel-part__decor"></div>
						</div>
					</div>
					<div class="col-4">
						<div class="panel__part panel-part">
							<div class="container py-4 panel-part__block">
								<div class="row">

									<div class="col">
										<input
											type="text"
											v-model="findUserInput"
											class="control-element control-element__input-text"
											placeholder="Найти пользователя"
										>
									</div>

								</div>
							</div>
							<div class="panel-part__decor"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="list page__list">
			<div class="container">

				<div
					v-for="user in filteredUsers"
					class="row list__item"
				>
					<div class="col">
						<list-item :user="user"></list-item>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import listItem from './components/list-item.vue'

export default {
	name: 'App',

	components: {
		listItem
	},

	setup() {
		const store = useStore(),
			newUserInput = ref(''),
			findUserInput = ref(''),
			filteredUsers = computed(() => store.getters.filteredUsers(findUserInput.value)),
			newUserAction = () => {
				store.commit('createUser', newUserInput.value);
				newUserInput.value = '';
			};

		return {
			newUserInput,
			findUserInput,
			newUserAction,
			filteredUsers,
		}
	}
}
</script>

<style lang="scss">
@import './css/bootstrap-grid.min.css';

* {
	box-sizing: border-box;
}

body, html {
	margin: 0;
	width: 100%;
	direction: ltr;
	box-sizing: border-box;
}

body {
	font-size: 14px;
	line-height: 1.5;
	min-height: 100%;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

.page {
	&__panel {
		margin-top: 30px;
	}

	&__list {
		margin-top: 50px;
	}
}

.header {
	&__inner {
		height: 100px;
		display: flex;
		align-items: center;
		background-color: #ffe116;
		border-radius: 0 0 10px 10px;
	}

	&__title {
		margin: 0;
		line-height: 1;
	}
}

.panel-part {
	z-index: 2;
	position: relative;

	&__block {
		border-radius: 10px;
		background-color: #fcfcfc;
	}

	&__decor {
		top: 5px;
		left: 5px;
		z-index: -1;
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: 10px;
		background-color: #ffe116;
	}
}

.control-element {
	outline: 0;
	width: 100%;
	height: 50px;
	color: #000000;
	font-size: 16px;
	line-height: 1.3;
	border-radius: 5px;

	&__small {
		height: 30px;
	}

	&__input-text {
		border: 0;
		padding: 10px;
		color: #474747;
		background-color: #f2f2f2;
	}

	&__button {
		border: 0;
		cursor: pointer;
		text-align: center;
		background-color: #ffe116;
		box-shadow: 0 4px 6px 0 rgb(255 238 122 / 30%);
	}
}

.list {
	&__item:nth-child(n+2) {
		margin-top: 15px;
	}
}
</style>
