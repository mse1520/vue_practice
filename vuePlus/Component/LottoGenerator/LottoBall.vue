<style scoped>
/* 이 컴포넌트에서만 css를 사용하고 싶을때 scoped를 사용합니다 */
.ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
}
</style>

<template>
    <div>
        <div class="ball" :style="styleObject">{{number}}</div>
        <div>{{vuexDataArr}}</div>
        <div>{{vuexData}}</div>
        <button @click="parentTest()">부모 데이터 접근 테스트</button>
        <button @click="parentTestArr()">부모 객체 데이터 접근 테스트</button>
        <button @click="eventBusTest()">EventBus</button>
        <button @click="vuexTest()">vuex</button>
        <slot />
    </div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "./EventBus";
import { SET_VUEX_DATA_ARR } from "./store";

export default {
    //name을 안주면 파일의 이름이 name이 됩니다.
    //name: 'LottoBall',
    //props: ["number"],
    //아래의 방법이 권장사항이며 Nmber는 자료형을 뜻합니다.
    //예시) props: { tableData: Array },
    props: { number: Number },
    computed: {
        styleObject() {
            let background;
            if (this.number <= 10) {
                background = 'red';
            } else if (this.number <= 20) {
                background = 'orange';
            } else if (this.number <= 30) {
                background = 'yellow';
            } else if (this.number <= 40) {
                background = 'blue';
            } else {
                background = 'green';
            }
            return { background };
        },
        ...mapState(["vuexData", "vuexDataArr"]),
        // vuexDataArr() {
        //     return this.$store.state.vuexDataArr;
        // }
        //참고용 예시, 코드 없음
        //mapState를 쓸 때 아래와 같이 사용가능하다는 점을 기억하자
        // ...mapState({
        //     tableData: state => state.tableData,
        //     turn: state => state.turn,
        //     cellData(state) {
        //         return state.tableData[this.rowIndex][this.cellIndex];
        //     }
        // }),
    },
    methods: {
        parentTest() {
            console.log(this.$root.$data);
            //부모
            // this.$parent.$parent.$data 부모의 부모
            console.log(this.$parent.$data);
            console.log(this.$root.$data.parentData);
            this.$root.$data.parentData = this.$root.$data.parentData === "O" ? "X" : "O";
        },
        parentTestArr() {
            console.log(this.$root.$data.parentDataArr);
            //this.$set 대신 Vue.set을 쓸수도 있지만 import Vue from 'vue'을 해줘야한다.
            this.$set(this.$root.$data.parentDataArr, 0, this.$root.$data.parentDataArr[0] === "O" ? "X" : "O");
            //아래의 내용을 해결하는 방법은 위의 코드
            //this.$root.$data.parentDataArr[0] = this.$root.$data.parentDataArr[0] === "O" ? "X" : "O";
        },
        eventBusTest() {
            EventBus.$emit("clickEventBusTest", "submit data test");
        },
        vuexTest() {
            //this.$store.commit('SET_VUEX_DATA_ARR', 0);
            this.$store.commit(SET_VUEX_DATA_ARR, 0);
        }
    }
}
</script>