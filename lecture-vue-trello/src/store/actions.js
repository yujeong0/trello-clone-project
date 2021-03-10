import * as api from '../api'
const actions = {  // 비동기
    LOGIN({commit}, {email, password}) {    // api call 을 위한 login
        return api.auth.login(email, password)  
          .then(({accessToken}) => commit('LOGIN', accessToken))
    },
    ADD_BOARD(_, {title}) {
        return api.board.create(title).then(data => data.item)
    },
    FETCH_BOARDS({commit}) {
        return api.board.fetch().then(data => {
            commit('SET_BOARDS', data.list)
        })
    },
    FETCH_BOARD ({commit}, {id}) {
        return api.board.fetch(id).then(data => {
            commit('SET_BOARD', data.item)
        })
    },
    ADD_CARD({dispatch, state}, {title, listId, pos}) {
        return api.card.create(title, listId, pos)
            .then(() => dispatch('FETCH_BOARD', {id: state.board.id}))
    },
    FETCH_CARD({commit}, {id}) {
        return api.card.fetch(id).then(data => {
            commit('SET_CARD', data.item)
        })
    },
    UPDATE_CARD({dispatch, state}, {id, title, description, pos, listId}) {
        return api.card.update(id, {title, description, pos, listId})
            .then(() => dispatch('FETCH_BOARD', {id: state.board.id}))
    }
}

export default actions

