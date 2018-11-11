import $axios from "axios";
import { mainUrl } from './url.js';
import { Toast, Loading } from 'vant';
import store from '@/store/store'


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
                if (load == 1)Toast.clear();
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
        mainUrl + url,data
    )
        .then(function (res) {
            if (load == 1)Toast.clear();
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
}