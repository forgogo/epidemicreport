

// 1.引入axios
import axios from 'axios'
export const getData= () => {
    return axios({
      url: 'http://api.tianapi.com/txapi/ncov/index',
      params:{
          key:"你的密钥"
      }
    })
  }
  
