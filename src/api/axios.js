

// 1.引入axios
import axios from 'axios'

// 2. 获取指定栏目的所有新闻数据
export const getData= () => {
    return axios({
      url: 'http://api.tianapi.com/txapi/ncov/index',
      params:{
          key:"你的密钥"
      }
    })
  }
  
