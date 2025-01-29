import "./TextField.css"

const TextField = (props) => {

    const placeholder = `${props.placeholder}...`

    const onTyped = (evento) => {
        props.onChanged(evento.target.value)
    }

    return (
        <div className="text-field">
            <label>
                {props.label}
            </label>
            <input
                value={props.value}
                onChange={onTyped}
                required={props.obrigatorio}
                placeholder={placeholder}
            />
        </div>
    )
}

export default TextField