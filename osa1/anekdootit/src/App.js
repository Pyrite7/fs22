import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [highestVoted, setHighestVoted] = useState(0)

  const selectRandom = () => {
    const newSelection = Math.floor(Math.random() * (anecdotes.length))
    setSelected(newSelection)
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    if(newVotes[selected] > votes[highestVoted]) {
      setHighestVoted(selected)
    }
    setVotes(newVotes)

    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>   

      <button onClick={() => selectRandom()}>next anecdote</button>
      <button onClick={() => vote()}>vote this anecdote</button>

      <h1>Anecdote with the most votes</h1>
      {anecdotes[highestVoted]}
      <p>has {votes[highestVoted]} votes</p>
      
    </div>
  )
}

export default App