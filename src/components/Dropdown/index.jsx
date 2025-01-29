import "./Dropdown.css"

const Dropdown = (props) => {
    const options = props.items.map(item => <option key={item}>{item}</option>)
    
    return (
        <div className="dropdown">
            <label>{props.label}</label>
            <select 
                onChange={evento => props.onChanged(evento.target.value)} 
                required={props.required} 
                value={props.value}
            >
                <option value=""></option>
                {options}
            </select>
        </div>
    )
}

export default Dropdown