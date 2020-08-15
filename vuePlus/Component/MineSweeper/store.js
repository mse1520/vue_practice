import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

const plantMine = (row, col, mine) => {
    const candidate = Array(row * col).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / col);
        const hor = shuffle[k] % col;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

export default new Store({
    //vue의 data
    state: {
        tableData: [],
        data: {
            row: 0,
            col: 0,
            mine: 0
        },
        timer: 0,
        halted: true,
        result: '',
        openedCount: 0
    },
    //vue의 computed
    getters: {

    },
    //state를 동기적으로 수정할 때 사용
    //getters와의 차이점은 인자를 받을수 있다
    //즉, mutations는 state를 변경할 때 쓰이고
    //getters는 state를 단순 연산한 값을 나타낼때 쓰인다
    mutations: {
        START_GAME(state, { row, col, mine }) {
            state.data = {
                row,
                col,
                mine
            }
            state.tableData = plantMine(row, col, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
            state.result = "";
        },
        OPEN_CELL(state, { row, col }) {
            let openedCount = 0;
            const checked = [];

            function checkAround(row, col) {
                if (row < 0 || row >= state.tableData.length || col < 0 || col >= state.tableData[0].length)
                    return;
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][col]))
                    return;

                if (checked.includes(`${row}/${col}`))
                    return;
                else
                    checked.push(`${row}/${col}`);

                let around = [];
                if (state.tableData[row - 1] !== undefined) {
                    around = around.concat([
                        state.tableData[row - 1][col - 1], state.tableData[row - 1][col], state.tableData[row - 1][col + 1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][col - 1], state.tableData[row][col + 1]
                ]);
                if (state.tableData[row + 1] !== undefined) {
                    around = around.concat([
                        state.tableData[row + 1][col - 1], state.tableData[row + 1][col], state.tableData[row + 1][col + 1]
                    ]);
                }
                const count = around.filter(
                    (value) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(value)
                ).length;

                if (count === 0) { // 주변칸에 지뢰가 하나도 없으면
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, col - 1]);
                        near.push([row - 1, col]);
                        near.push([row - 1, col + 1]);
                    }
                    near.push([row, col - 1]);
                    near.push([row, col + 1]);
                    if (row + 1 < state.tableData.length) {
                        near.push([row + 1, col - 1]);
                        near.push([row + 1, col]);
                        near.push([row + 1, col + 1]);
                    }
                    near.forEach((n) => {
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) checkAround(n[0], n[1]);
                    });
                }

                if (state.tableData[row][col] === CODE.NORMAL) openedCount++;

                Vue.set(state.tableData[row], col, count);
            }
            checkAround(row, col);

            let halted = false;
            let result = '';
            if (state.data.row * state.data.col - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다.`;
            }
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        CLICK_MINE(state, { row, col }) {
            state.halted = true;
            Vue.set(state.tableData[row], col, CODE.CLICKED_MINE);
        },
        FLAG_CELL(state, { row, col }) {
            if (state.tableData[row][col] === CODE.MINE)
                Vue.set(state.tableData[row], col, CODE.FLAG_MINE);
            else
                Vue.set(state.tableData[row], col, CODE.FLAG);
        },
        QUESTION_CELL(state, { row, col }) {
            if (state.tableData[row][col] === CODE.FLAG_MINE)
                Vue.set(state.tableData[row], col, CODE.QUESTION_MINE);
            else
                Vue.set(state.tableData[row], col, CODE.QUESTION);
        },
        MORMALIZE_CELL(state, { row, col }) {
            if (state.tableData[row][col] === CODE.QUESTION_MINE)
                Vue.set(state.tableData[row], col, CODE.MINE);
            else
                Vue.set(state.tableData[row], col, CODE.NORMAL);
        },
        INCREMENT_TIMER(state) {
            state.timer++;
        }
    },
    //비동기로 사용하거나 여러 뮤테이션을 연달아 사용할 때
    actions: {

    }
});