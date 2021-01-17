import React, { useState, useEffect} from 'react';
import { getAdministrator } from '../../axios';
import './SetAdministrator.css';

function SetAdministrator() {

    const [data, setdata] = useState([]);

    useEffect(() => {
        let isUnmount = false;
        if(!data.length&&!isUnmount){
           getAdministrator().then(result => {
            console.log(result)   
            setdata(result)
        })
        }
        
        return () => isUnmount = true;
      },[data])
    
    
  // TODO : fill in the rendering contents and logic
  return (
    <div >
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
        </table>
    
   
  </div>
  )
}
export default SetAdministrator;
