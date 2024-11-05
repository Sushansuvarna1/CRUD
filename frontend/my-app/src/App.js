import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
import NavBar from './components/NavBar';
import { useDispatch } from 'react-redux';

const App=()=>{
//   const [index, setIndex] = useState(-1)
// const arr=["banana","kiwi","grapes","apple","mango","pinepale"]
// const handleClick=()=>{
//   // const filter=arr.slice(0,index+1)
//   // console.log("filgt",filter)
// setIndex( (index) => index + 1)
// // console.log(index+1)


// }
return(
  <div>
    <NavBar/>
    {/* <h1 onClick={()=>{handleClick()}}>{index>=0 ? arr[index] : "Hello world"}</h1>  */}
  </div>
)

}
export default App;
