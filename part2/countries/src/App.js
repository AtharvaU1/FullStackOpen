import {useEffect, useState} from 'react';
import axios from 'axios';
import Country from './country';

function App() {
  const [inputField, setInputField] = useState('');
  const [countriesArray, setCountriesArray] = useState([]);

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    setInputField(inputVal);
  }
  console.log(process.env.REACT_APP_API_KEY);
  useEffect(() => {
    if(inputField==='') return;

      const fetchCountryData = async () => {
        try {
          const countries = await axios.get(`https://restcountries.com/v3.1/name/${inputField}`);
          setCountriesArray(countries.data);
          //console.log(countries.data);
        } catch (error) {
          setCountriesArray([]);
          console.log('couldn\'t fetch country data', error);
        }
      }

      fetchCountryData();

  }, [inputField]);

  return (
    <>
      find countries: <input value={inputField} onChange={handleInputChange}/>
      <br/>
      {countriesArray.length > 10 ? 
        'Too many matches, please be more precise.' :
        countriesArray.length === 0 && inputField.length>0 ? 
          'No matches.' :
          <ul>
            {countriesArray.map((countryObject, index) => 
              <li key={index}>
                <Country props={countryObject}/>
              </li>
            )}
          </ul>
      }
    </>
  )
}

export default App;
