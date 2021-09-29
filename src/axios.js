import axios from 'axios'
import Element from 'element-ui'
import router from './router'

axios.defaults.baseURL = "http://localhost:8088"

// 前置拦截
axios.interceptors.request.use(config => {
    return config;
}, function (error) {
    console.log('error!!!');
    return Promise.reject(error);
})
//后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;
        console.log("=================")
        console.log(res)
        console.log("=================")
        if (res.code === 200) {
            return response
        } else if(res.code === 401){
            Element.Message.error(res.message, {duration: 3 * 1000})
            router.push("/login")
            return Promise.reject(res.message)
        }else {
            Element.Message.error(res.message, {duration: 3 * 1000})
            return Promise.reject(res.message)
        }
    },
)