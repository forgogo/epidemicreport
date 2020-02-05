
<template>
  <div id="app">
    <div class="container">
      <div class="itemList">
        <van-row type="flex" justify="center">
          <van-col span="6">
            <div class="item">
              <span class="count" style="color:#e4593e">{{detail.confirmedCount}}</span>
              <span class="message">确诊</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="item">
              <span class="count" style="color:#e78834">{{detail.suspectedCount}}</span>
              <span class="message">疑似</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="item">
              <span class="count" style="color:#985d51">{{detail.seriousCount}}</span>
              <span class="message">重症</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="item">
              <span class="count" style="color:#616f8f">{{detail.deadCount}}</span>
              <span class="message">死亡</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="item" style="border-right:none">
              <span class="count" style="color:#5ab4a3">{{detail.curedCount}}</span>
              <span class="message">治愈</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="virusList">
        <ul>
          <li>{{detail.note1}}</li>
          <li>{{detail.note2}}</li>
          <li>{{detail.note3}}</li>
          <li>{{detail.remark1}}</li>
          <li>{{detail.remark2}}</li>
          <li>{{detail.remark3}}</li>
        </ul>
      </div>
      <!-- 地图 -->
      <div id="main" style="width: 100vw;height:80vh"></div>
      <!-- 实时播报 -->
      <div>
      <h2>实时播报</h2>
        <van-cell-group>
          <van-cell title="单元格" value="内容" label="描述信息" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/axios.js";
export default {
  data() {
    return {
      detail: {},
      case: [],
      caseCount: [],
      deadCount: []
    };
  },
  methods: {
    drawChart() {
      let csee = this.case;
      let deadCount = this.deadCount;
      let caseCount = this.caseCount;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "各省市报告"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["确诊病例", "死亡病例"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: csee
        },
        series: [
          {
            name: "确诊病例",
            type: "bar",
            data: caseCount
          },
          {
            name: "死亡病例",
            type: "bar",
            data: deadCount
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },

  async mounted() {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getData();
    // 保存病毒详情
    this.detail = res.data.newslist[0].desc;
    // 将所有省份保存下来
    let arr = res.data.newslist[0].case;
    let arr2 = arr.map(item => {
      return item.provinceShortName;
    });
    this.case = arr2;

    // 所有省份数据
    let arr3 = arr.map(item => {
      return item.confirmedCount;
    });
    this.caseCount = arr3;
    let arr4 = arr.map(item => {
      return item.deadCount;
    });
    this.deadCount = arr4;

    this.drawChart();
  }
};
</script>

<style lang='less'>
.container {
  padding: 20px;
  background-color: rgb(242, 242, 242);
  .itemList {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #ccc;
    .count {
      font-size: 20px;
      font-weight: 800;
      padding: 5px 0;
    }
    .message {
      font-size: 16px;
      color: black;
      padding: 5px 0;
    }
  }
  .virusList {
    ul {
      li {
        padding: 5px 0;
      }
    }
  }
}
</style>
