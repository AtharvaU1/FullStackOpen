const RenderAll = ({deletePerson, persons, newName}) => {
    
    return (
    <div>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person =>
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>Delete</button>
            </li>
            )}
        </ul>
        debug: {newName}
    </div>
    )
}

export default RenderAll;