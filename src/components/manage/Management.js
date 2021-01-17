
import React, { useState,useEffect } from 'react'
import { getUserData,deleteUserData,updateUserData,getUserTime } from '../../axios'
import './Management.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';




function Management() {
  const [data, setdata] = useState([]);
  const [display_data, setdisplay_data] = useState([""]);
  const [style, setstyle] = useState("");
  const [value, setvalue] = useState("");
  

  //跟DB要資料
  useEffect(() => {
    let isUnmount = false;
    if(!data.length&&!isUnmount){
       getUserData().then(result=>setdata(result))
    }
    if(display_data[0]!==""){
      handle_search(style,value)
    }
    return () => isUnmount = true;
  },[data])

  //處理查詢
  const handle_search = (style,value) => {
    let display_da = [];
    if(style === ""){
      //顯示所有資料
      for (let i = 0; i < data.length; i++) {
        let element = data[i];
        element.index = i;
        display_da.push(element);
      }
      setstyle("");
      setvalue("");
    }
    else{
      for (let i = 0; i < data.length; i++) {
        if(data[i][style]===value){
          let element = data[i];
          element.index = i;
          display_da.push(element);
        }
      }
      setstyle(style);
      setvalue(value);
    }
    setdisplay_data(display_da);
    }

    
  
  //修改跟刪除
  const handle_revise_delete = async (bt_name,revise_value,index) => {
    if(bt_name==="revise"){
      let repeatstd = false;
      for(let i=0; i<data.length; i++){
        if(revise_value.stdID===data[i].stdID){
          repeatstd = true;
        }
      }
      if(revise_value.stdID === ""){
        revise_value.stdID = data[index].stdID;
        repeatstd = false;
      }
      if(!repeatstd){
        updateUserData(data[index]._id,revise_value.stdID,revise_value.name)
        let list = [...data];
        list[index] = {_id:data[index]._id,stdID: revise_value.stdID, name: revise_value.name};
        setdata(list);
      }
      else{
        alert("有重複的學號了!!")
      }
    }
    else if(bt_name==="delete"){
      const msg = await deleteUserData(data[index]._id)
      if (msg){
        let list = [...data];
        list.splice(index,1);
        setdata(list);
      }
    }
  };
    return (
      <div className="manage-container">
        <h2>管理端管理頁面</h2>
        <Search text="學號" onClick={handle_search}/>
        <Search text="姓名" onClick={handle_search}/>
        <button onClick={handle_search}>顯示所有資料</button>
        <br/>
        {display_data[0]==="" ? <div></div> : <Display display_data={display_data} onClick={handle_revise_delete}></Display>}
      </div>
    );
}

function Search(props) {
  const { text,onClick } = props;
  const [value, setvalue] = useState("");

  //處理合法的輸入
  function validateForm() {
    if(text==="學號"){
      return value.length === 9;
    }
    else if(text==="姓名"){
      return  value.length > 0;
    }
   
  }
  const handle_click = ()=>{
    if(text==="學號"){
      onClick("stdID",value.toUpperCase())
    }
    else if(text==="姓名"){
      onClick("name",value)
    }
    setvalue("");
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handle_click()
    }
  }
  return (
    <>
      <div>
        {text+"查詢 : "}
        <input type="text"  placeholder={"輸入"+text} value={value} onChange={(e)=>{setvalue(e.target.value)}} onKeyPress={handleKeyPress}/>
        <button onClick={handle_click} disabled={!validateForm()}>查詢</button>
      </div>
    </>
  );
}
  
function Display(props) {
  const { display_data,onClick } = props;

  if(display_data.length===0){
    return <h4>查無資料QQ</h4>;
  }
  else{
    let dis = display_data.map((obj)=>{return <SearchData obj={obj} key={obj.index} onClick={onClick}></SearchData>});
    return(
      <>
        <h4>查詢結果:</h4>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>姓名</TableCell>
                <TableCell>學號</TableCell>
                <TableCell>更新名字</TableCell>
                <TableCell>更新學號</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dis}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
}

function SearchData(props){
  const {onClick,obj } = props;
  const [name, setname] = useState("");
  const [stdID, setstdID] = useState("");
  const [time, setTime] = useState([]);
  const [open, setOpen] = React.useState(false);
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  const classes = useRowStyles();

  useEffect(() => {
    handle_time(obj);
  },[obj]);
  
  const handle_time = async(obj)=>{
    const time_data = await getUserTime(obj.stdID)
    setTime(time_data)
  }
 

  //處理合法的輸入
  function validateForm() {
    if(name.length>0){
      return stdID.length === 9 | stdID.length === 0;
    }
    else if(stdID.length === 9){
      return  true ;
    }
  }
  const handle_click = (event)=>{
    if(event.target.name==="revise"){
      if(name===""){
        onClick(event.target.name,{name:obj.name,stdID:stdID.toUpperCase()},obj.index);
      }
      else{
        onClick(event.target.name,{name:name,stdID:stdID.toUpperCase()},obj.index);
      }
      setname("");
      setstdID("");
    }
    else{
      onClick(event.target.name,{name:name,stdID:stdID.toUpperCase()},obj.index);
    }
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handle_click(event)
    }
  }

  
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{obj.name}</TableCell>
        <TableCell>{obj.stdID}</TableCell>
        <TableCell><input placeholder={obj.name}  value={name} onChange={(e)=>{setname(e.target.value)}} onKeyPress={handleKeyPress} name="revise"></input></TableCell>
        <TableCell><input placeholder={obj.stdID} value={stdID} onChange={(e)=>{setstdID(e.target.value)}} onKeyPress={handleKeyPress} name="revise"></input></TableCell>
        <TableCell>
          <button onClick={handle_click} name="revise"disabled={!validateForm()}>修改</button>
          <button onClick={handle_click} name="delete">删除</button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                進出資料
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>時間</TableCell>
                    <TableCell>進 or 出</TableCell>
                    <TableCell>原因</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {time.map((Row,index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {Row.time[0]}
                      </TableCell>
                      <TableCell>{Row.direction}</TableCell>
                      <TableCell>{Row.purpose}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>      
    </>
  );
}

export default Management;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>姓名</TableCell>
            <TableCell align="right">學號</TableCell>
            <TableCell align="right">更新名字</TableCell>
            <TableCell align="right">更新學號</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CollapsibleTable;
*/