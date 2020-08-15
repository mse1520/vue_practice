<style scoped>
/* 이 컴포넌트에서만 css를 사용하고 싶을때 scoped를 사용합니다 */
</style>

<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus">
            <div>테스트</div>
        </lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
        <p>{{parentData}}</p>
        <p>{{parentDataArr}}</p>
        <p>{{vuexDataArr}}</p>
    </div>
</template>

<script>
import LottoBall from "./LottoBall";
import EventBus from "./EventBus";
import store from "./store";

function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const timeouts = [];
export default {
    store,
    //component: { 'lotto-ball': LottoBall },
    components: { LottoBall },
    data() {
        return {
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
            parentData: "O",
            parentDataArr: ["O", "", ""]
        };
    },
    //computed는 종속된 대상이 변경될때만 함수를 실행한다.
    computed: {
        vuexDataArr() {
            return this.$store.state.vuexDataArr;
        }
    },
    methods: {
        onClickRedo() {
            this.winNumbers = getWinNumbers();
            this.winBalls = [];
            this.bonus = null;
            this.redo = false;
            this.showBalls();
        },
        showBalls() {
            for (let i = 0; i < this.winNumbers.length - 1; i++) {
                timeouts[i] = setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i]);
                }, (i + 1) * 1000);
            }
            timeouts[6] = setTimeout(() => {
                this.bonus = this.winNumbers[6];
                this.redo = true;
            }, 7000);
        },
        eventBusTest(data) {
            console.log(`eventBus test: ${data}`);
        }
    },
    created() {
        EventBus.$on("clickEventBusTest", this.eventBusTest);
    },
    //주로 시작할때 실행해야 하는 것은 created 보단 mounted 에서 실행합니다.
    mounted() {
        this.showBalls();
    },
    //자원 해제
    beforedDestroy() {
        timeouts.forEach((timeout) => { clearTimeout(timeout); });
    }
    //watch는 최대한 쓰지맙시다
    //watch: { winBalls(val, oldVal) { if (val.length === 0) this.showBalls(); } }
};
</script>