<template>
	<div class="list-item py-2">
		<div class="container">
			<div class="row">
				<div class="col-3" :class="{'no-padding': editing}">
					<input
						ref="inputName"
						v-if="editing"
						autofocus
						v-model="user.name"
						class="control-element control-element__input-text control-element__small list-item__input"
						placeholder="Имя пользователя"
					>
					<div
						v-else
						class="list-item__name"
					>{{ user.name }}
					</div>
				</div>
				<div class="col-2">
					<button
						v-if="editing"
						@click="changeUser"
						class="control-element control-element__button control-element__small"
					>Сохранить
					</button>
					<button
						v-else
						@click="toggleEditing"
						class="control-element control-element__button control-element__small"
					>Изменить
					</button>
				</div>
				<div class="col-2">
					<button
						@click="deleteUser"
						class="control-element control-element__button control-element__small"
					>Удалить
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'

export default {
	name: 'list-item',

	props: {
		user: {
			type: Object,
			required: true,
			default: {
				id: null,
				name: '',
			},
		},
	},

	setup(props) {
		const store = useStore(),
			inputName = ref(null),
			editing = ref(false),
			toggleEditing = () => {
				editing.value = !editing.value;
			},
			changeUser = () => {
				store.commit('changeUser', {id: props.user.id, name: props.user.name});
				toggleEditing();
			},
			deleteUser = () => {
				if (confirm('Вы уверены, что хотите удалить пользователя?')) {
					store.commit('deleteUser', props.user.id);
				}
			};

		return {
			inputName,
			editing,
			toggleEditing,
			changeUser,
			deleteUser,
		}
	}
}
</script>

<style lang="scss" scoped>
.no-padding {
	padding-left: 0;
	padding-right: 0;
}

.list-item {
	border-radius: 5px;
	background-color: #f2f2f2;
	box-shadow: 0 4px 6px 0 rgb(250 250 250 / 30%);

	&__name {
		display: flex;
		font-size: 16px;
		min-height: 30px;
		line-height: 1.3;
		align-items: center;
	}
	
	&__input {
		background-color: #fff;
	}
}
</style>