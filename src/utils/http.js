import axios from "axios";
import { Toast } from "vant";

const httpRequest = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

// 添加请求拦截器
httpRequest.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token");
    }
    Toast.loading({
      mask: false,
      forbidClick: true, // 禁用背景点击
      loadingType: "spinner",
      message: "加载中..."
    });
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
httpRequest.interceptors.response.use(
  response => {
    Toast.clear();
    // 对响应数据做点什么
    const { status, data } = response;
    if (status === 200) {
      // 针对token过期
      if (/10010|10020|10030|10050/.test(data.code)) {
        Toast.fail({
          message: data.msg,
          duration: 800,
          onClose() {
            localStorage.removeItem("token");
            localStorage.setItem("pageUrl", location.href);
            location.href = `${location.origin}/login`;
          }
        });
      }
      return data;
    }
    return response;
  },
  error => {
    Toast.clear();
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default httpRequest;
