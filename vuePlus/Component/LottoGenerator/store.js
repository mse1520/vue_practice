import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export const SET_VUEX_DATA_ARR = 'SET_VUEX_DATA_ARR';

export default new Store({
    //vue의 data
    state: {
        vuexData: "O",
        vuexDataArr: ["", "", ""]
    },
    //vue의 computed
    getters: {

    },
    //state를 동기적으로 수정할 때 사용
    //getters와의 차이점은 인자를 받을수 있다
    //즉, mutations는 state를 변경할 때 쓰이고
    //getters는 state를 단순 연산한 값을 나타낼때 쓰인다
    mutations: {
        [SET_VUEX_DATA_ARR](state, index) {
            //state.vuexData[index] = state.vuexData === "O" ? "X" : "O";
            Vue.set(state.vuexDataArr, index, state.vuexDataArr[index] === "O" ? "X" : "O");
            console.log(state.vuexDataArr);
        }
    },
    //비동기로 사용하거나 여러 뮤테이션을 연달아 사용할 때
    actions: {

    }
});