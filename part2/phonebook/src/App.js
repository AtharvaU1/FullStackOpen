import { useEffect, useState } from 'react'
import Filter from './filter';
import Form from './form';
import RenderAll from './renderAll';
import axios from 'axios';
import './index.css';
import {Notification, Error} from './notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterArray, setFilterArray] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      const replaceNumber = window.confirm(`${newName} already exists in the phonebook, replace the old number with new one?`);
      if(replaceNumber) {
        const obj = persons.find(person => person.name === newName);
        axios
          .put(`http://localhost:3001/persons/${obj.id}`, {
            ...obj, number: parseInt(newNum)
          })
          .then(response => {
            console.log(response);
            setPersons(persons.map(person => person.id === obj.id ? response.data : person));
          }).catch(error => setErrorMsg(`couldn't find ${newName} on the server`));
      }
      setNotificationMsg(`Successfully updated ${newName}`);
      setTimeout(() => {
        setNotificationMsg(null);
      }, 5000);
      setNewName('');
      setNewNum('');
      return;
    }

    const newObject = {
      name: newName,
      id: persons.length+1,
      number: parseInt(newNum),
    }
    axios.post(
      'http://localhost:3001/persons', newObject
    ).then(response => {
      console.log(response);
      setNotificationMsg(`Successfully added ${newName}`);
      setTimeout(() => {
        setNotificationMsg(null);
      }, 5000);
      setPersons(persons.concat(newObject));
      setNewName('');
    }).catch(error => {
      setErrorMsg(error);
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    });
    
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

  const deletePerson = (id) => {
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => errorMsg("The person has been already removed from the server"));

      setPersons(persons.filter(person => person.id !== id));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMsg={notificationMsg}/>
      <Error errorMsg={errorMsg}/>
      <Filter filterInput={filterInput} handleFilterInput={handleFilterInput} filterArray={filterArray}/>
      <Form handleSubmit={handleSubmit} handleNameInput={handleNameInput} newName={newName} handleNumInput={handleNumInput} newNum={newNum}/>
      <RenderAll deletePerson={deletePerson} persons={persons} newName={newName}/>
    </div>
  )
}

export default App