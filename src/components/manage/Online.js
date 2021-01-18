import React, { useState,useEffect } from 'react'
import { getPeople } from '../../axios'
import './Online.css';
import loadingGif from '../../assets/loading.gif'

function Online() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isUnmount = false;
     
        if(!data.length&&!isUnmount){
           getPeople().then(result=>{
            setData(result)
            setLoading(false); 
           }    
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
    
    if(loading){
          return(<div className="center"><img src={loadingGif} alt="loading" width="250"></img></div>)
    }
    else{
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
 
    
}



export default Online;