import {useState} from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleGood = () => setGood(good+1);

  const handleBad = () => setBad(bad+1);

  const handleNeutral = () => setNeutral(neutral+1);

  const clear = () => {
    setGood(0);
    setBad(0);
    setNeutral(0);
  }

  const average = (good+(bad*(-1)))/(good+bad+neutral);  
  const positive = ((good/(good+bad+neutral)) * 100);

  const statsObj = {
    good: good, 
    bad: bad,
    neutral: neutral,
    average: average,
    positive: positive
  }

  return (
    <div className="App">
      <p>Give Feedback</p>
      <Button text={'good'} event={handleGood}/>
      <Button text={'bad'} event={handleBad}/>
      <Button text={'neutral'} event={handleNeutral}/>
      <Button text={'clear'} event={clear}/>
      <br></br>
      <Statistics statsObj={statsObj}/>
    </div>
  );
}

const Statistics = (props) => {
  if(props.statsObj.good===0 && props.statsObj.bad===0 && props.statsObj.neutral===0){
    return (
      <div>
        No Feedback Given
      </div>
    )
  }

  return (
    <table>
      <caption>Statistics</caption>
      <tbody>        
        <StatisticLine text={'good'} value={props.statsObj.good}/>
        <StatisticLine text={'bad'} value={props.statsObj.bad}/>
        <StatisticLine text={'neutral'} value={props.statsObj.neutral}/>
        <StatisticLine text={'average'} value={props.statsObj.average}/>
        <StatisticLine text={'positive'} value={props.statsObj.positive}/>
      </tbody>  
    </table>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.event}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{Number.isNaN(props.value) ? '-' : props.value}</td>
    </tr>
  )
}

export default App;