<template>
    <Modal>
        Card
        <div v-if="loading">loading Card...</div>
        <div v-else>
            <div>cid : {{cid}}</div>
        </div>
    </Modal>

</template>

<script>
import Modal from './Modal.vue'
export default {
    components: { Modal },
    data() {
        return {
            cid: 0,
            loading: false
        }
    },
    watch: {
        // '$route'() {    // 주소바뀌면
        //     this.fetchData()
        // }
        '$route': {    // 객체로 해서 immediate 옵션주면 created와 합칠 수 있다
            handler: 'fetchData',
            immediate: true
        }
    },
    created() {
        // this.fetchData()
    },
    methods: {
        fetchData() {
            this.loading = true
            setTimeout(()=> {
                this.cid = this.$route.params.cid
                this.loading = false
            }, 500)
        }
    }
}
</script>

<style>
    
</style>