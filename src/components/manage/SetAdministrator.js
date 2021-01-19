import React, { useState, useEffect, useRef} from 'react';
import { getAdministrator, deleteAdministrator, insertAdministrator } from '../../axios';
import './SetAdministrator.css';
import loadingGif from '../../assets/loading.gif'

function SetAdministrator() {

    const [data, setData] = useState([]);
    const [insert, setInsert] = useState(false);
    const [newDay, setNewDay] = useState('');
    const [newTime, setNewTime] = useState('');
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        let isUnmount = false;

        if(!data.length&&!isUnmount){
           getAdministrator().then(result => {
            setData(result)
            setLoading(false);
        })
        }
        return () => isUnmount = true;
      },[data])

    const insertAdmin = (day, time) => {
        setInsert(true);
        setNewDay(day);
        setNewTime(time);
    }
    const deleteAdmin = (day, time, name) => {
        const success = deleteAdministrator(day, time, name);
        const dataFilter = data.filter(person => (!(person.day === day) || !(person.time === time) || !(person.name === name)));
        setData(dataFilter);
        if(success === "刪除失敗")
            alert("刪除失敗");
        else
            alert("刪除成功");
    }
    const AdministratorColumn = (props) => {

        if(data.length){
            const nameList = data.filter(data => (data.day === props.day && data.time === props.time));
            if(nameList.length > 0){
                const name = nameList.map((person) => <span className="person-data">
                    {person.name} <button className="functional-button-insert" onClick={() => deleteAdmin(props.day ,props.time, person.name)}>刪除</button>
                <br/>
                </span>);
                const returnEntry = <span>{name} <button onClick={ () => insertAdmin(props.day, props.time)}>新增</button>
                </span>
                return (returnEntry);
            }      
            else
                return(<span><b>休息</b><br/><br/>
                <button onClick={() => insertAdmin(props.day, props.time)}>新增</button>
                </span>)
        }
        else{
            return(<div></div>)
        }
       
   
    }
    const AdministratorRow = (props) => {

    

        return(
            <tr>
                <td colSpan="2">{props.time}</td>
                <td className="item"><AdministratorColumn day="星期一" time={props.target}/></td>
                <td className="item"><AdministratorColumn day="星期二" time={props.target}/></td>
                <td className="item"><AdministratorColumn day="星期三" time={props.target}/></td>
                <td className="item"><AdministratorColumn day="星期四" time={props.target}/></td>
                <td className="item"><AdministratorColumn day="星期五" time={props.target}/></td>
            </tr>
        )
    }

    
const InsertMode = (props) => {
    const [newAdmin, setNewAdmin] = useState('');
    const nameRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        nameRef.current.focus();
      },[])
    const handleNewAdminChange = (e) => {
        setNewAdmin(e.target.value);
    };

    function insertAdminToBackend(day, time, name){
        if(name === ""){
            alert("姓名須非空");
        }
        else{
            const success = insertAdministrator(day, time, name);
            if(success === "新增失敗")
                alert("新增失敗");
            else{
                alert("新增成功");
                setInsert(false);
                const newData = data;
                newData.push({day: day, time: time, name: name});
                setData(newData)
            }
                
        }
        
        
    };

    
    return(
        <div className="insert-form-container">
            <form className="insert-form">
                <h2>新增管理者頁面</h2>
                <div className="insert-form-row">日期: {props.day}</div>
                <div className="insert-form-row">時間: {props.time}</div>
                <input ref={nameRef} value={newAdmin} onChange={handleNewAdminChange} placeholder="請入新的管理者"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      submitRef.current.focus()
                    }
                  }}/>
                <button ref={submitRef} className="functional-button-insert" onClick={() => insertAdminToBackend(props.day, props.time, newAdmin)}>送出</button>
            </form>
        </div>


    )
  
    
}

  if(loading){
    return(<div className="center"><img src={loadingGif} alt="loading" width="250"></img></div>)
}else{
    if(insert){
        return(
            <InsertMode day={newDay} time={newTime}/>
        )
      }
      else{
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
      
}
  
}

export default SetAdministrator;
