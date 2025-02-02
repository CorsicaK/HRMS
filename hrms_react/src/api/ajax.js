/*  
  发送异步ajax请求的函数模块
  优化:1.统一处理请求异常=>在外层包一个自己创建的promise对象
        在请求出错时,不用reject(error),而是显示错误提示 
      2.不要异步得到response,而是response.data
        在请求成功resolve时,resolve(response.data)
*/
import axios from 'axios';
import { message } from 'antd'


export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    //执行异步ajax请求
    if (type === 'GET') {           //发送GET请求
      promise = axios.get(url, {    //配置对象
        params: data                //指定请求参数
      })
    } else if (type === 'POST') {
      promise = axios.post(url, data)
    } else if (type === 'DELETE') {
      promise = axios.delete(url, data)
    } else if (type === 'PUT') {
      promise = axios.put(url, data)
    }
    //成功,调用resolve(value)
    promise.then(response => {
      resolve(response.data)
      //失败,不调用reject(reason),以提示异常信息的形式
    }).catch(error => {
      message.error('请求出错:' + error.message, 5)
    })
  })
}


