import React, { useState, useEffect} from 'react';
import { getAdministrator } from '../../axios';
import './SetAdministrator.css';



function SetAdministrator() {

    const [data, setdata] = useState([]);

    useEffect(() => {
        
        let isUnmount = false;

        
        if(!data.length&&!isUnmount){
           getAdministrator().then(result => {
            //console.log(result)   
            setdata(result)
        })
        }
        
        return () => isUnmount = true;
      },[data])
    
    const AdministratorColumn = (props) => {
        const nameList = data.filter(data => (data.day === props.day && data.time === props.time));
        //console.log(nameList);
        if(nameList.length > 0){
            const returnName = nameList.map((person) => <span>{person.name}<br/></span>);
            console.log(returnName)
            return returnName;
        }      
        else
            return(<b>休息</b>)
   
    }
    const AdministratorRow = (props) => {

    

        return(
            <tr>
                <td colSpan="2">{props.time}</td>
                <td><AdministratorColumn day="星期一" time={props.target}/></td>
                <td><AdministratorColumn day="星期二" time={props.target}/></td>
                <td><AdministratorColumn day="星期三" time={props.target}/></td>
                <td><AdministratorColumn day="星期四" time={props.target}/></td>
                <td><AdministratorColumn day="星期五" time={props.target}/></td>
                {/*
                <td>徐子程<br/>楊學翰</td>
                <td>勞志毅<br/>邱吉鈞</td>
                <td>徐子程<br/>徐有齊</td>
                <td>王懷志</td>
                <td>勞志毅<br/>許家誠</td>
                */}
            </tr>
        )
    }
    
  // TODO : fill in the rendering contents and logic
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
          <AdministratorRow time="早上(10:20-12:20)" target="早上" />
          <AdministratorRow time="下午A(13:20~15:20)" target="下午A" />
          <AdministratorRow time="下午B(15:20~17:30)" target="下午B" />
          <AdministratorRow time="晚上(18:30~21:20)" target="晚上"/>
          {/*
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
          */}
      </tbody>
          </table>
             
    </div>
    )
}
export default SetAdministrator;
