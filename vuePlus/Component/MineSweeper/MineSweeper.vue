<style scoped>
/* 이 컴포넌트에서만 css를 사용하고 싶을때 scoped를 사용합니다 */
</style>

<template>
    <div>
        <mine-form />
        <div>{{ timer }}</div>
        <table-component />
        <div>{{ result }}</div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./store";

import MineForm from "./MineForm";
import TableComponent from "./TableComponent";

let interval;
export default {
    store,
    components: { MineForm, TableComponent },
    data() {
        return {
        };
    },
    //computed는 종속된 대상이 변경될때만 함수를 실행한다.
    computed: {
        ...mapState(["timer", "halted", "result"])
    },
    methods: {
    },
    watch: {
        halted(currentValue, oldValue) {
            if (!currentValue) {
                interval = setInterval(() => {
                    this.$store.commit("INCREMENT_TIMER");
                }, 1000);
            } else {
                clearInterval(interval);
            }
        }
    },
    beforedDestroy() {
        clearInterval(interval);
    }
};
</script>