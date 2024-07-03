import React from "react";
import Form from './Form'
import GetExpense from "./GetExpense";

export default function Home() {
  const [exp, setExp] = React.useState([]);
 
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2 mt-24">
        <div className="text-3xl font-extrabold  text-bl text-center non-italic">
          Expense-Tracker
        </div>
        <Form setExp={setExp}/>
      </div>
      <div className='mt-24'> 
        <GetExpense exp={exp} setExp={setExp}/>
      </div>
    </div>
  );
}