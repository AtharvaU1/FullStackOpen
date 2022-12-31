const Form = ({handleSubmit, handleNameInput, newName, handleNumInput, newNum}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new</h2>
            <div>
                name: <input onChange={handleNameInput} value={newName}/>
            </div>
            <div>
                number: <input type="number" onChange={handleNumInput} value={newNum}/>
            </div>        
            <button type="submit">
                add
            </button>
        </form>
    )
}    

export default Form;      