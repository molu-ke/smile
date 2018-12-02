import $axios from "axios";
import { mainUrl } from './url.js';
import { Toast, Loading } from 'vant';
import store from '@/store/store';

//axios的访问请求默认是不带cookie的,全局设置
// $axios.defaults.withCredentials = false

//方法一：直接调用axios的实例方法(get、post)，缺点：不灵活
/*
export default function request(url, data, method, load, cb) {
    data.APPID = store.state.APPID;
    data.token = store.state.token;
    data.partnerId = store.state.partnerId;

    if (load == 1) {
        Toast({
            type: 'loading',
            duration: 0,
        })
    }

    if (method == 'GET') {
        $axios.get(
            mainUrl + url,
            { params: data }
        )
            .then(function (res) {
                if (load == 1) Toast.clear();
                if (res.data.result != 'OK') {
                    Toast({
                        duration: 3000,
                        forbidClick: true,
                        message: res.data.result
                    });
                    return;
                }
                cb && cb(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        return;
    }

    $axios.post(
        mainUrl + url, data
    )
        .then(function (res) {
            if (load == 1) Toast.clear();
            if (res.data.result != 'OK') {
                Toast({
                    duration: 3000,
                    forbidClick: true,
                    message: res.data.result
                });
                return;
            }
            cb && cb(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}*/


//方法二：创建axios的实例(axios.create([config]))
export default function request(url, data, method, load, cb) {

    let instance = $axios.create({
        baseURL: mainUrl + url,
        method: method,
        timeout: 30 * 1000,// 30秒超时
        withCredentials: false, //表示跨域请求时是否需要使用凭证
        headers: {//即将被发送的自定义请求头
            'X-Requested-With': 'XMLHttpRequest'
        }
    })

    // 添加请求拦截器
    instance.interceptors.request.use(
        // 在发送请求之前做些什么
        config => {

            // 通过token，判断用户是否登录
            //store.state.token = ''
            if (store.state.token == '') {
                return Promise.reject("请登录");
            }

            if (load == 1) {
                Toast({
                    type: 'loading',
                    duration: 0,
                })
            }


            data.APPID = store.state.APPID;
            data.token = store.state.token;
            data.partnerId = store.state.partnerId;

            //console.log(config);
            config.method === 'post'
                ? config.data = data
                : config.params = data

            return config;
        },
        // 对请求错误做些什么
        error => {
            return Promise.reject(error);
        });

    // 添加响应拦截器
    instance.interceptors.response.use(
        // 对响应数据做点什么
        response => {
            if (load == 1) Toast.clear();

            if (response.data.result != 'OK') {
                return Promise.reject(response.data.result);
            }
            return response.data;
        },

        // 对响应错误做点什么
        error => {
            return Promise.reject(error);
        });

    instance()
        .then(response => {
            //console.log(response);
            cb && cb(response);
        })
        .catch(error => {
            Toast({
                duration: 4000,
                forbidClick: true,
                message: error
            });
            console.log('请求异常信息：' + error);
        })
}