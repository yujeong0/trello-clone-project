<template>
    <div>
        Board
        <div v-if="loading">loading board...</div>
        <div v-else>
            <div>bid : {{ bid }}</div>
            <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
            <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
        </div>
        <hr/>
        <router-view></router-view> <!-- App.vue 하위 Board.vue 에 router-view : Board의 children 인 Card.... 어렵군.... -->
    </div>
</template>

<script>

export default {
    data() {
        return {
            bid: 0,
            loading: false
        }
    },
    created() {
        this.fetchData()
        this.bid = this.$route.params.bid
    },
    methods: {
        fetchData() {
            this.loading = true
            setTimeout(() => {
                this.bid = this.$route.params.bid
                this.loading = false    // 500ms 후에 loading을 false로 바꿈
            }, 500)
        }
    }
}
</script>

<style>
    
</style>