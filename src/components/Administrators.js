import React, { useState, useEffect} from 'react';
import { getAdministrator } from '../axios';
import './Administrator.css';



function Administrator() {

    const [data, setData] = useState([]);

    useEffect(() => {
        
        let isUnmount = false;

        
        if(!data.length&&!isUnmount){
           getAdministrator().then(result => {
            //console.log(result)   
            setData(result)
        })
        }
        
        return () => isUnmount = true;
      },[data])

    const AdministratorColumn = (props) => {
        if(data.length){
            const nameList = data.filter(data => (data.day === props.day && data.time === props.time));
            //console.log(nameList);
            if(nameList.length > 0){
                const returnName = nameList.map((person) => <span>{person.name}<br/></span>);
                return returnName;
            }      
            else{
                return(<b>休息</b>)
            }
                
            }
        else{
            return(<div></div>);
        }
        
   
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
          
      </tbody>
          </table>
             
    </div>
    )
}
export default Administrator;
