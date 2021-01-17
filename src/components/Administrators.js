import React from 'react';



function Administrator() {
  
  return (
  <div>
    <table>
    <thead>
        <tr>
            <th colSpan="2">時段</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colSpan="2">早上(10:20-12:20)</td>
            <td>張喬善</td>
            <td>馬健凱</td>
            <td>張喬善<br/>施力維</td>
            <td>吳兩原<br/>蔡亞辰</td>
            <td>陳柏志<br/>謝明圜</td>
        </tr>
        <tr>
            <td colSpan="2">下午A(13:20~15:20)</td>
            <td>周柏融</td>
            <td>馬健凱<br/>吳兩原</td>
            <td>詹侑昕<br/>謝明圜</td>
            <td>許家誠<br/>蔡承佑</td>
            <td><b>休息</b></td>
        </tr>
        <tr>
            <td colSpan="2">下午B(15:20~17:30)</td>
            <td>蔡亞辰<br/>楊學翰</td>
            <td>周柏融<br/>徐有齊</td>
            <td>黃曜廷<br/>詹侑昕</td>
            <td><b>休息</b></td>
            <td><b>休息</b></td>
        </tr>
        <tr>
            <td colSpan="2">晚上(18:30~21:20)</td>
            <td>徐子程<br/>楊學翰</td>
            <td>勞志毅<br/>邱吉鈞</td>
            <td>徐子程<br/>徐有齊</td>
            <td>王懷志</td>
            <td>勞志毅<br/>許家誠</td>
        </tr>
    </tbody>
        </table>
           
  </div>
  )

}



export default Administrator;