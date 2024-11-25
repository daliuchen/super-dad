import axios from 'axios';




// 创建一个 Axios 实例
const apiClient = axios.create({
    timeout: 5000, // 设置请求超时时间
});

// 添加请求拦截器
apiClient.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const token = typeof localStorage !== 'undefined'? localStorage.getItem('super-dad-token'):null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;