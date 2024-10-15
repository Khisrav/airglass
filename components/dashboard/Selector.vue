<template>
	<select ref="selectInput" v-model="selectedGroup" @change="onChange" class="w-full p-1 border rounded">
		<option v-for="group in groups" :key="group.id" :value="group.id">
			{{ group.name }}
		</option>
	</select>
</template>

<script>
export default {
	props: {
		groups: {
			type: Array,
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			selectedGroup: this.value,
		};
	},
	methods: {
		onChange() {
			this.$emit("input", this.selectedGroup);
		},
		getValue() {
			return this.selectedGroup;
		},
		isPopup() {
			return false;
		},
	},
	mounted() {
		this.$refs.selectInput.focus();
	},
};
</script>
