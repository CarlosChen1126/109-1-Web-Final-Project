import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { getPeople } from '../../axios'

function Online() {
    const [data, setData] =useState([]);
    useEffect(() => {
        let isUnmount = false;
     
        if(!data.length&&!isUnmount){
           getPeople().then(result=>
            setData(result)        
        )
        }
        return () => isUnmount = true;
      },[data])

    const showData = () => {
        console.log(data);
    }
    
    const setDataJsx = (props) => {
        /*
        const dataBody = props.map((person)=>{
           <tr>person.stdID</tr>
          
        })
        console.log(props);
        console.log(dataBody);
        return(
           <tbody> { dataBody }</tbody>
        )
        */
        return props.map((person)=>{
            const {stdID, EntryTime, Purpose, _id } = person;
            console.log(stdID);
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
            <th onClick={showData}>學號</th>
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