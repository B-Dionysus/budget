
interface budgetProps{
    ball:budgetBall;
    total:number;
    changeAmount:Function,
    changeName:Function
  }
interface budgetBall{
    id:number;
    name:string,
    amount:number,
    color?:string,
  }


  export type {
      budgetProps, budgetBall,
  }