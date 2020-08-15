<template>
    <div>
        <!-- <input type="number" placeholder="가로" :value="col" @change="onChangeCol" /> -->
        <input type="number" placeholder="세로" v-model="row" />
        <input type="number" placeholder="가로" v-model="col" />
        <input type="number" placeholder="지뢰" v-model="mine" />
        <button @click="onClickBtn">시작</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            row: 10,
            col: 10,
            mine: 20,
        };
    },
    methods: {
        // onChangeCol(e) {
        //   this.col = e.target.value;
        // },
        onClickBtn() {
            this.$store.commit("START_GAME", { row: this.row, col: this.col, mine: this.mine });
        }
    }
}
</script>