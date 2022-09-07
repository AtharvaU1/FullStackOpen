import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(7).fill(0));
  const [mostVoted, setMostVoted] = useState(new Array(2).fill(0));
  
  const handleClick = () => {
    const random = Math.floor(Math.random() * 7);
    setSelected(random);
    const newVotes = [...votes];
    newVotes[random] += 1;
    setVotes(newVotes);

    if(newVotes[random]>mostVoted[0]){
      const newMostVoted = [...mostVoted];
      newMostVoted[0] = newVotes[random];
      newMostVoted[1] = random;
      setMostVoted(newMostVoted);
    }    
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] ? votes[selected]:0} votes</p>
      <button onClick={handleClick}>next anecdote</button>
      <p>anecdote with most votes</p>
      <p>{anecdotes[mostVoted[1]]}</p>
      <p>has {mostVoted[0]} votes</p>
    </div>
  )
}

export default App