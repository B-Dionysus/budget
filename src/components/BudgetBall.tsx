import {budgetProps} from "../types/interfaces"
import "../css/budget.css";

export default function BudgetBall(props:budgetProps){
    const min=70;
    let ballSize=Math.log((props.ball.amount/props.total)*100);
    ballSize*=100;
    if(ballSize<min) ballSize=min;
    let style={height:ballSize+"px", width:ballSize+"px", backgroundColor:"#"+props.ball.color}
    let shineStyle={height:ballSize+"px", width:ballSize+"px"}

    function change(e:React.FormEvent<HTMLInputElement>){
        e.preventDefault(); 
        if(e.currentTarget.id==="title"){
            props.changeName(e.currentTarget.value, props.ball.id);
        } 
        else{
            let amnt=parseInt(e.currentTarget.value)-props.ball.amount;
            console.log(amnt);
            props.changeAmount(amnt,props.ball.id)
        }
    }
    // If there is enough width to fit the name of the budget item, when we don't need to move it
    let titleTop=0;
    let amountTop=0;
    // However, if the name is, roughly, 10.5 times the width of the ball, it will look badly
    // In which case, we can just more it up over the top
    if(ballSize<(props.ball.name.length*10.5)){
        titleTop=Math.floor(ballSize/2)*-1;
        // And also nudge the amount up a bit.
        amountTop=-10;
    }
    let titleStyle={top:titleTop+"px"}

    let amountWidth=40;
    if(props.ball.amount<100) amountWidth=25;
    else if(props.ball.amount<1000) amountWidth=30;

    return (

        <div className="budgetBall" id={props.ball.id.toString()} style={style}>
            <div className="cosmetics shine" style={shineStyle}></div>
            <div className="cosmetics shade" style={shineStyle}></div>
            <div className="menu">
                <div className="title" style={titleStyle}><input onBlur={change} id="title" type="text" placeholder ={props.ball.name} className="titleBar"/></div>
                {/* <div className="control plus" onClick={()=>props.changeAmount(100, props.ball.id)}>+</div> */}
                <div style={{position:"relative", top:amountTop+"px"}}key={props.ball.amount}>$<input className="amount" id="amnt" onBlur={change} type="text" defaultValue={props.ball.amount.toString()} style={{width:amountWidth+"px"}}/></div>
                {/* <div className="control minus" onClick={()=>props.changeAmount(-100, props.ball.id)}>-</div> */}
            </div>
        </div>

    );
}