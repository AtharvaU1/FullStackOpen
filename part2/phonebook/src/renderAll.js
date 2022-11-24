const RenderAll = ({persons, newName}) => {
    return (
    <div>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person =>
            <li key={person.id}>
                {person.name} {person.num}
            </li>
            )}
        </ul>      
        debug: {newName}
    </div>
    )
}

export default RenderAll;