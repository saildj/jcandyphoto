<template>
    <el-skeleton v-for="i in 6" :key="i" animated class="album-skeleton" />
</template>

<style lang="scss" scoped>
.album-skeleton {
	height: 300px;
	border-radius: 8px;
}
</style>