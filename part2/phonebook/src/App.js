import { useEffect, useState } from 'react'
import Filter from './filter';
import Form from './form';
import RenderAll from './renderAll';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterArray, setFilterArray] = useState([]);
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    console.log('inside useEffect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
  }, []);
  console.log('persons array size', persons.length);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} already exists in the array`);
      setNewName('');
      return;
    }

    const newObject = {
      name: newName,
      id: persons.length+1,
      num: parseInt(newNum),
    }
    setPersons(persons.concat(newObject));
    setNewName('');
  }

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  }

  const handleNumInput = (e) => {
    setNewNum(e.target.value);
  }

  const handleFilterInput = (e) => {
    setFilterInput(e.target.value);
    setFilterArray(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterInput={filterInput} handleFilterInput={handleFilterInput} filterArray={filterArray}/>
      <Form handleSubmit={handleSubmit} handleNameInput={handleNameInput} newName={newName} handleNumInput={handleNumInput} newNum={newNum}/>
      <RenderAll persons={persons} newName={newName}/>
    </div>
  )
}

export default App