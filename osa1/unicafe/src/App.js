import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const combineText = (text) => {
    return text
  }

  return (
    <div>
      <Header text="Give feedback"/>

      <Button clickHandler={() => setGood(good + 1)} text="good"/>
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button clickHandler={() => setBad(bad + 1)} text="bad"/>

      <Header text={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positivePercent = good / sum * 100
  
  const combineText = (text) => {
    return text
  }


  if (sum === 0){
    return(
    <div>
      <p>No feedback given</p>
    </div>
    )
  } else {
    return(
      <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{sum}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positivePercent}%</td>
          </tr>
        </tbody>
      </table>
    </div>
   )
  }
}

const Header = (props) => {
    return(
    <h1>{props.text}</h1>
    )
}

const Button = (props) => {
  return(
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const Label = (props) => {
  return(
    <p>{props.text} {props.value}</p>
  )
} 

export default App