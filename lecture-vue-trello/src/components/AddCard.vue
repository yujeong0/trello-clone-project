<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button v-bind:class="{'btn-success': !invalidInput, 'btn-disabled': invalidInput}" class="btn" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['listId'],
  data() {
    return {
      inputTitle: '',
    }
  },
  computed: {
      invalidInput() {
          return !this.inputTitle.trim()
      }
  },
  mounted() {
      this.$refs.inputText.focus()
      this.setupClickOutside()  // AddCard 컴포넌트의 element가 넘어감
  },
  beforeDestroy() {
      document.querySelector('body').removeEventListener('click', this.setupClickOutside)
      removeEventListener('click', this.closeWindow)
  },
  methods: {
      ...mapActions ([
          'ADD_CARD',
      ]),
      onSubmit() {
          if(this.invalidInput) return
          const {inputTitle, listId} = this
          const pos = this.newCardPos()
          this.ADD_CARD({title: inputTitle, listId, pos})
            .finally(() => this.inputTitle = '')
      },
      newCardPos() {
        const curList = this.$store.state.board.lists.filter(l => l.id === this.listId)[0]
        if (!curList) return 65535
        const {cards} = curList
        if (!cards.length) return 65535
        return cards[cards.length - 1].pos * 2
      },
      setupClickOutside() {
          document.querySelector('body').addEventListener('click', this.closeWindow)
      }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
.btn-disabled {
    background-color: #666;
}
.btn-red{
    background-color: red;
}
</style>