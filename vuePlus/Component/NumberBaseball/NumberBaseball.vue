<style scoped>
/* 이 컴포넌트에서만 css를 사용하고 싶을때 scoped를 사용합니다 */
.red {
    color: red;
}
.blue {
    color: blue;
}
</style>

<template>
    <div>
        <h1>{{result}}</h1>
        <!-- <form @submit.prevent="onSubmitForm"> -->
        <form v-on:submit.prevent="onSubmitForm">
            <input type="text" ref="answer" minlength="4" maxlength="4" v-model="value" />
            <button>입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="(t, index) in tries" v-bind:key="index">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
        <!-- <p v-bind:class="colorClass">클래스 테스트</p> -->
        <p :class="colorClass">클래스 테스트1</p>
        <p :class="{ red: false, blue: true }">클래스 테스트2</p>
        <p :style="{ color: 'yellow', backgroundColor: 'blueviolet' }">스타일 테스트3</p>
        <p :style="{ color: `${colorClass}`, backgroundColor: 'blueviolet' }">스타일 테스트4</p>
        <p :style="styleObject">스타일 테스트5</p>
        <p>{{computedTest}}</p>
        <button @click="countUP()">countUP</button>
    </div>
</template>

<script>
const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(
            Math.floor(Math.random() * (9 - i)),
            1
        )[0];
        array.push(chosen);
    }
    console.log(array);
    return array;
};

export default {
    data() {
        return {
            answer: getNumbers(),
            tries: [],
            value: "",
            result: "",
            colorClass: "red",
            count: 0
        };
    },
    //computed는 종속된 대상이 변경될때만 함수를 실행한다.
    computed: {
        computedTest() { return this.count; },
        styleObject() {
            return {
                color: `${this.colorClass}`,
                backgroundColor: 'blueviolet'
            };
        }
    },
    methods: {
        countUP() {
            this.count += 1;
        },
        onSubmitForm() {
            if (this.value === this.answer.join("")) {// 정답 맞췄으면
                this.tries.push({
                    try: this.value,
                    result: "홈런"
                });
                this.result = "홈런";
                alert("게임을 다시 실행합니다.");
                this.value = "";
                this.answer = getNumbers();
                this.tries = [];
                this.$refs.answer.focus();
            } else {// 정답 틀렸을 때
                if (this.tries.length >= 9) { // 10번째 시도
                    this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다!`;
                    alert('게임을 다시 시작합니다.');
                    this.value = '';
                    this.answer = getNumbers();
                    this.tries = [];
                    this.$refs.answer.focus();
                }
                let strike = 0;
                let ball = 0;
                const answerArray = this.value.split('').map(v => parseInt(v));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === this.answer[i]) strike++; // 숫자 자릿수 모두 정답
                    else if (this.answer.includes(answerArray[i])) ball++; // 숫자만 정답
                }
                this.tries.push({
                    try: this.value,
                    result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                });
                this.value = '';
                this.$refs.answer.focus();
            }
        }
    },
    beforeCreate() {
        console.log("before created");
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("before Mounted");
    },
    //주로 시작할때 실행해야 하는 것은 created 보단 mounted 에서 실행합니다.
    mounted() {
        console.log("mounted");
    },
    beforeUpdate() {
        console.log("before updated");
    },
    updated() {
        console.log("updated");
    },
    //자원 해제
    beforedDestroy() {
        console.log("before destroyed");
    },
    destroyed() {
        console.log("destroyed");
    }
};
</script>