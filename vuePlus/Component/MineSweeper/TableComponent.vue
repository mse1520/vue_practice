<style scoped>
table {
    border-collapse: collapse;
}
td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
}
</style>

<template>
    <div>
        <table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td
                    v-for="(cellData, colIndex) in rowData"
                    :key="colIndex"
                    :style="cellDataStyle(rowIndex, colIndex)"
                    @click="onClickTd(rowIndex, colIndex)"
                    @contextmenu.prevent="onRightClick(rowIndex, colIndex)"
                >
                    {{ cellDataText(rowIndex, colIndex) }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { CODE } from "./store";

export default {
    data() {
        return {
        };
    },
    //computed는 종속된 대상이 변경될때만 함수를 실행한다.
    computed: {
        ...mapState(["tableData", "halted"]),
        cellDataStyle() {
            return (row, col) => {
                switch (this.tableData[row][col]) {
                    case CODE.NORMAL:
                    case CODE.MINE:
                        return {
                            background: '#444',
                        };
                    case CODE.CLICKED_MINE:
                    case CODE.OPENED:
                        return {
                            background: 'white',
                        };
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return {
                            background: 'red',
                        };
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return {
                            background: 'yellow',
                        };
                    default: return {};
                }
            };
        },
        cellDataText() {
            return (row, col) => {
                switch (this.tableData[row][col]) {
                    case CODE.MINE:
                        return 'X';
                    case CODE.NORMAL:
                        return '';
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        return '!';
                    case CODE.QUESTION_MINE:
                    case CODE.QUESTION:
                        return '?';
                    case CODE.CLICKED_MINE:
                        return '펑';
                    default:
                        return this.tableData[row][col] || "";
                }
            };
        }
    },
    methods: {
        onClickTd(row, col) {
            if (this.halted) return;
            switch (this.tableData[row][col]) {
                case CODE.NORMAL:
                    return this.$store.commit("OPEN_CELL", { row, col });
                case CODE.MINE:
                    return this.$store.commit("CLICK_MINE", { row, col });
                default: return;
            }
        },
        onRightClick(row, col) {
            if (this.halted) return;
            switch (this.tableData[row][col]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    return this.$store.commit("FLAG_CELL", { row, col });
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                    return this.$store.commit("QUESTION_CELL", { row, col });
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    return this.$store.commit("MORMALIZE_CELL", { row, col });
                default: return;
            }
        }
    }
};
</script>