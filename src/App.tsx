import './css/budget.css';
import {useEffect, useState} from "react"
import {budgetBall} from "./types/interfaces"
import BudgetBall from "./components/BudgetBall"

// // if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// // }
// // process.env.AWS_SDK_LOAD_CONFIG="true"; 
// let AWS= require ("aws-sdk");
// AWS.config.update({region: 'us-east-1'});
// console.log(AWS.config);

// // AWS.config.loadFromPath('../credentials'); 

// const tableName = "lexicon-entries"
// var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
// var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

// async function logSingleItem(){
//   try {
//       var params = {
//           Key: {
//            "id": {"S": "1625771324489.1987"} 
//           }, 
//           TableName: tableName
//       };
//       var result = await dynamodb.getItem(params).promise()
//       console.log(JSON.stringify(result))
//   } catch (error) {
//       console.error(error);
//   }
// }
// logSingleItem()
// import AWS from '@aws-amplify/core';
 
// 
// var AWS = require("aws-sdk");

// AWS.config.getCredentials(function(err:any) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });

// console.log("Region: ", AWS.config.region);
import { addEntry }  from './graphql/mutations';
import awsconfig from './aws-exports';
import { API, graphqlOperation } from "aws-amplify";
API.configure(awsconfig);
 
function App() {
  const [budget,setBudget]=useState([{amount: 100, color: "888888", id: 0, name: "Main"}]);
  const [total, setTotal]=useState(100);

  useEffect(()=>{
    console.log("UE");
    let tempTotal=window.localStorage.getItem('total');
    if(tempTotal){
      let tempBudget=JSON.parse(window.localStorage.getItem('budget')!);
      console.log(tempBudget);
      setTotal(parseInt(tempTotal));
      setBudget(tempBudget);
    }
    else console.info("No budget Saved");
  },[])

  useEffect(()=>{
    console.info("Budget changed"); 
    let newElement=document.getElementById((budget.length-1).toString())!;
    (newElement.childNodes[2].firstChild!.firstChild! as HTMLInputElement).focus();
  },[budget.length]);

  function changeAmount(amnt:number, id:number){
    if(amnt<=budget[0].amount || id===0){
      let tempArray=[...budget];
      tempArray[id].amount+=amnt;
      if(tempArray[id].amount<=0) {
        tempArray.splice(id,1);
        for(let i=id;i<tempArray.length;i++){
          tempArray[i].id-=1;
        }
      }
      // If we are changing the amount of money in the primary budget ball, that will also change the
      // total for every budget ball in the array
      if(id===0){
          window.localStorage.setItem("total",JSON.stringify(total+amnt));
          setTotal(total+amnt);
      }
      else{
        tempArray[0].amount-=amnt;
      }
      window.localStorage.setItem("budget",JSON.stringify(tempArray));
      setBudget(tempArray);
    }
    else console.error("No money left to allocate!")
  }
  function changeName(newName:string, id:number){
    if(newName){
      let tempArray=[...budget];
      tempArray[id].name=newName;
      window.localStorage.setItem("budget",JSON.stringify(tempArray));
      setBudget(tempArray); 
    }
  }
  function addBall(){
    if(budget[0].amount>0){
      let tempArray=[...budget];
      let newAmnt=100;
      if(tempArray[0].amount<100) newAmnt=tempArray[0].amount;
      tempArray[0].amount-=newAmnt;
      let rColor:string=Math.floor(Math.random()*16777215).toString(16);
      let newBall={
        id:tempArray.length,
        name:"New", 
        amount:newAmnt,
        total:total,
        color:rColor,
      }
      tempArray.push(newBall);
      window.localStorage.setItem("budget",JSON.stringify(tempArray));
      setBudget(tempArray);
    }
    else console.error("No money left to allocate!")
  }


  return ( 
    <div>
      <div className="control controlPanel" onClick={addBall}>
        +
      </div>
      <div className="budgetBallContainer">
      {budget.map((ball:budgetBall)=>(
        <BudgetBall key={ball.id} ball={ball} total={total} changeName={changeName} changeAmount={changeAmount}/>
      ))}
      </div>
    </div>
  );
}

export default App;
// 2600
// [{"amount":0,"color":"888888","id":0,"name":"Main"},{"id":1,"name":"Allowance","amount":600,"total":2600,"color":"568f63"},{"id":2,"name":"Art Supplies","amount":40,"total":2600,"color":"2c07d"},{"id":3,"name":"YMNT Software","amount":15,"total":2600,"color":"3c03e8"},{"id":4,"name":"Transportation","amount":100,"total":2600,"color":"4dbbc2"},{"id":5,"name":"Charity","amount":20,"total":2600,"color":"35204e"},{"id":6,"name":"Groceries","amount":140,"total":2600,"color":"201068"},{"id":7,"name":"Parking","amount":60,"total":2600,"color":"4f47ce"},{"id":8,"name":"Parking","amount":60,"total":2600,"color":"4e8e3b"},{"id":9,"name":"Therapy","amount":50,"total":2600,"color":"3477ba"},{"id":10,"name":"Electricity","amount":50,"total":2600,"color":"9bacff"},{"id":11,"name":"Google Music","amount":10,"total":2600,"color":"4c4699"},{"id":12,"name":"Health Insurance","amount":100,"total":2600,"color":"5596e8"},{"id":13,"name":"Piano Lessons","amount":75,"total":2600,"color":"e48401"},{"id":14,"name":"Cell Phone","amount":60,"total":2600,"color":"dd09f9"},{"id":15,"name":"Charity","amount":20,"total":2600,"color":"b171da"},{"id":16,"name":"Commonwealth Edison","amount":20,"total":2600,"color":"28e16c"},{"id":17,"name":"Rent","amount":750,"total":2600,"color":"649547"},{"id":18,"name":"Renter's Insurance","amount":10,"total":2600,"color":"6080b5"},{"id":19,"name":"TV","amount":18,"total":2600,"color":"4ad24e"},{"id":20,"name":"Savings","amount":260,"total":2600,"color":"da77dd"},{"id":21,"name":"Extra","amount":142,"total":2600,"color":"6d7aab"}]