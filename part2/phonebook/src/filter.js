const Filter = ({filterInput, handleFilterInput, filterArray}) => {
return (
        <div>
            filter shown with: <input value={filterInput} onChange={handleFilterInput}/>
            <ul>
                {filterArray.map(person => 
                <li key={person.id}>
                    {person.name} {person.num}
                </li>
                )}
            </ul>
        </div>
    )
}


export default Filter;