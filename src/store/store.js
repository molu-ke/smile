import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
    // 1. state
    state: {
        APPID: "wx8b5df949020cb310",
        token: "mu_b5b66b91-dbd1-4b58-9cf0-b6c982c54caa",
        partnerId: 88888,
        mode: "3-1-0-6",
        user: {
            city: "Guangzhou", headImg: "http://thirdwx.qlogo.cn/mmopen/vi_32/GDpXrJ10nia1bHkRIhJr9ibtXvhtY8gf7HicdzLzxUZh0vXYgzEClAEt5yQs55IXFY0Wk9qECrKS3zdKodqHhaEgg/132",
            ifNewUser: 0,
            imUserId: 488,
            ins: "0",
            inviteCode: "NKVF7M",
            mobile: "159****007",
            result: "OK",
            role: 2,
            roleName: "城市合伙人",
            sex: 1,
            shareUrl: "http://app.bainians.com/?k=2n90",
            token: "mu_b5b66b91-dbd1-4b58-9cf0-b6c982c54caa",
            unionidF: "oFh3k1XpGHjK6ftbt03TiWwuHFvc",
            userKey: "8D5AF60D7ABECFD0",
            wxEwm: "https://img.bnln100.com/ewmpic1527734736422",
            wxNickName: "陌路。"
        },
        test: ''
    },

    // 2. getters
    getters: {
        // 参数列表state指的是state数据
        getCityFn(state) {
            return state.city;
        }
    },
    // 3. actions
    // 通常跟api接口打交道
    actions: {
        // 设置城市信息
        // 参数列表：{commit, state}
        // state指的是state数据
        // commit调用mutations的方法 
        // name就是调用此方法时要传的参数
        setCityName({ commit, state }, name) {
            // 跟后台打交道
            // 调用mutaions里面的方法
            commit("setCity", name);
        }
    },
    // 4. mutations
    mutations: {
        // state指的是state的数据
        // idx传递过来的数据
        change(state, idx) {
            if (idx == 0) {
                state.mode = '3-1-0-5';
            } else if (idx == 1) {
                state.mode = '3-1-0-6';
            }
        },

        testFun(state) {
            state.test = "测试"
        }

    }
});

export default store;