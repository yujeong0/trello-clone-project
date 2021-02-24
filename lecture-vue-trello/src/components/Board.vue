<template>
    <div>
        Board
        <div v-if="loading">loading board...</div>
        <div v-else>
            <div>bid : {{ bid }}</div>
            <pre>{{ board }}</pre>
            <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
            <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
        </div>
        <hr/>
        <router-view></router-view> <!-- App.vue 하위 Board.vue 에 router-view : Board의 children 인 Card.... 어렵군.... -->
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data() {
        return {
            bid: 0,
            loading: false
        }
    },
    computed: {
        ...mapState({
            board: 'board'
        })
    },
    created() {
        this.fetchData()
        this.bid = this.$route.params.bid
    },
    methods: {
        ...mapActions([
            'FETCH_BOARD'
        ]),
        fetchData() {
            this.loading = true
            this.FETCH_BOARD({id: this.$route.params.bid})
                .then(() => this.loading = false)
        }
    }
}
</script>

<style>
    
</style>