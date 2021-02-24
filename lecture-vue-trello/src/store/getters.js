const getters = {
    isAuth(state) { // 로그인 여부 확인
        return !!state.token
    }
}

export default getters