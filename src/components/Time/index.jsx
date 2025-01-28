import './Time.css'
import Colaborador from '../Colaborador'

const Time = (props) => {
    return (
        props.colaboradores.length > 0 && <section className='time' style={{ backgroundColor: props.corSecundaria }}> 
            <h3 style={{borderColor:  props.corPrimaria}}>{props.nome}</h3>
            <div className='colaboradores'>
                {props.colaboradores.map( colaborador => <Colaborador corDeFundo={props.corPrimaria} key={colaborador.name} nome={colaborador.name} cargo={colaborador.role} imagem={colaborador.image}/>)}
            </div>
        </section>
    )
}

export default Time