import './css/budget.css';
import {useEffect, useState} from "react"
import {budgetBall} from "./types/interfaces"
import BudgetBall from "./components/BudgetBall"


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
