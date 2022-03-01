import './actividadLista.css'


import CircleHomePage from "../CircleHomePage/CircleHomePage"
import SocialNetwork from "../SocialNetwork/SocialNetwork"

const ActividadLista = ({nombreEmpresa, descripcionGeneral, fecha, plazas}) =>{
return (
    <section className="actividad">

        <CircleHomePage id={'idActividad'} clas={'listaActividades'} children={'Tipo actividad'}/>

            <div className="socialNetwortEmpty">
            <h3>{nombreEmpresa}</h3>
                {/* <SocialNetwork href={'https://www.instagram.com/'} children={'instagram'}/>
                <SocialNetwork href={'https:/es-es.facebook.com/'} children={'facebook'}/> */}


            <p>{descripcionGeneral}</p>
                <div className='actividadF_P'>
            <p>{fecha} </p> 
            <p>{plazas}</p>
                </div>
            </div>

    </section>
)
}
export default ActividadLista