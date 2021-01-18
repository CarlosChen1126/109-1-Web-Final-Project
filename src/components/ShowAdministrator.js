import React, { useState, useEffect} from 'react';
import { getAdministrator } from '../axios';
import './ShowAdministrator.css';

const CurrentAdministrator = (props) => {
    
    let dayString = "";
    if(props.day === 1){
        dayString = "星期一";
    }else if(props.day === 2){
        dayString = "星期二";
    }else if(props.day === 3){
        dayString = "星期三";
    }else if(props.day === 4){
        dayString = "星期四";
    }else if(props.day === 5){
        dayString = "星期五";
    }else{
        alert("有錯誤")
    }
    const nameList = props.data.filter(data => (data.day === dayString && data.time === props.time));

    
        if(nameList.length > 0){
            const returnName = nameList.map((person) => <span>{person.name} </span>);
            console.log(returnName)
            return returnName;
        }
        else{
            return <b>休息</b>
        }
}


function ShowAdministrator() {

    const [data, setData] = useState([]);

    useEffect(() => {
        
        let isUnmount = false;

        
        if(!data.length && !isUnmount){
           getAdministrator().then(result => {
            //console.log(result)   
            setData(result)
        })
        }
        
        return () => isUnmount = true;
      },[data])

      const date = new Date();
      const day = date.getDay();
      const hour = date.getHours();
      const minute = date.getMinutes();
      
     

      if(day === 6 || day === 7){
          return(<b>休息</b>)
      }else if(hour <= 9 || hour >= 22){
        return(<b>休息</b>)
      }else if(hour === 10 && minute < 20){
        return(<b>休息</b>)
      }else if(hour === 21 && minute > 20){
          return(<b>休息</b>)
      }else if(hour >= 9 && hour <= 11){
          return(<CurrentAdministrator time="上午" day = {day} data={data}/>)
      }else if(hour === 12 && minute <= 20){
        return(<CurrentAdministrator time="上午" day = {day} data={data}/>)
      }else if(hour === 12 && minute > 20){
        return(<b>休息</b>)
      }else if(hour === 13 && minute <= 20){
        return(<b>休息</b>)
      }else if(hour === 13 && minute > 20){
        return(<CurrentAdministrator time="下午A" day = {day} data={data}/>)
      }else if(hour >= 13 && hour <= 14){
        return(<CurrentAdministrator time="下午A" day = {day} data={data}/>)
      }else if(hour === 15 && minute <= 20){
        return(<CurrentAdministrator time="下午A" day = {day} data={data}/>)
      }else if(hour === 15 && minute > 20){
        return(<CurrentAdministrator time="下午B" day = {day} data={data}/>)
      }else if(hour === 16){
        return(<CurrentAdministrator time="下午B" day = {day} data={data}/>)
      }else if(hour === 17 && minute <= 30){
        return(<CurrentAdministrator time="下午B" day = {day} data={data}/>)
      }else if(hour === 17 && minute > 30){
        return(<b>休息</b>)
      }else if(hour === 18 && minute <= 30){
        return(<b>休息</b>)
      }else if(hour === 18 && minute > 30){
        return(<CurrentAdministrator time="晚上" day = {day} data={data}/>)
      }else if(hour >= 19 && hour <= 20){
        return(<CurrentAdministrator time="晚上" day = {day} data={data}/>)
      }else if(hour === 21 && minute <= 20){
        return(<CurrentAdministrator time="晚上" day = {day} data={data}/>)
      }
   
}
export default ShowAdministrator;
