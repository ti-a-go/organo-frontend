import "./Employee.css"
import { AiFillCloseCircle } from 'react-icons/ai';



const Employee = (props) => {
    return (
        <div className="employee">
            <AiFillCloseCircle 
                size={25} 
                className="delete" 
                onClick={() => props.onDelete(props.id)}
            />
            <div className="header" style={{ backgroundColor: props.backgroundColor }}>
                <img src={props.image} alt={props.name}/>
            </div>
            <div className="_footer">
                <h4>{props.name}</h4>
                <h5>{props.role}</h5>
            </div>
        </div>
    )
}

export default Employee
