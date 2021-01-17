import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { getPeople } from '../../axios'

function Online() {
    const [data, setData] = useState([]);
    useEffect(() => {
        let isUnmount = false;
     
        if(!data.length&&!isUnmount){
           getPeople().then(result=>
            setData(result)        
        )
        }
        return () => isUnmount = true;
      },[data])
    
    const setDataJsx = (props) => {
        
        return props.map((person)=>{
            const {stdID, EntryTime, Purpose, _id } = person;
            return(
                <tr key={_id}>
                    <td>{stdID}</td>
                    <td>{EntryTime}</td>
                    <td>{Purpose}</td>
                </tr>
            )
        })
    } 
    

  return(
    <table>
        <thead>
        <tr>
            <th>學號</th>
            <th>進入時間</th>
            <th>進來原因</th>
        </tr>
        </thead>
            <tbody>
                {setDataJsx(data)}
                </tbody>
        </table>

  );
    
}



export default Online;