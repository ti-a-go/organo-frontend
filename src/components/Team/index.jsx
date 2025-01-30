import './Team.css'
import hexToRgba from 'hex-to-rgba';
import Employee from '../Employee'

const Team = (props) => {
    return (
        props.employees.length > 0 
        && 
        <section 
            className='team' 
            style={{ backgroundColor: hexToRgba(props.color, '0.6') }}
        >
            <input 
                type='color' 
                className='input-color' 
                value={props.color} 
                onChange={evento => props.changeColor(evento.target.value, props.id)} 
            />

            <h3 style={{borderColor: props.color}}>{props.name}</h3>
            
            <div className='employees'>
                {props.employees.map( employee => (
                    <Employee 
                        id={employee.id}
                        backgroundColor={props.color} 
                        key={employee.name} 
                        name={employee.name} 
                        role={employee.role} 
                        image={employee.image}
                        onDelete={props.onDeleteEmployee}
                    />
                ))}
            </div>
        </section>
    )
}

export default Team