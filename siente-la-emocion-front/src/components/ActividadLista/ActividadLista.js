import CircleHomePage from "../CircleHomePage/CircleHomePage"
import SocialNetwork from "../SocialNetwork/SocialNetwork"



const ActividadLista = ({nombreEmpresa, descripcionGeneral, fecha, plazas}) =>{
return (
    <section className="actividad">

        <CircleHomePage id={'idActividad'} clas={'listaActividades'} children={'Tipo actividad'}/>
        <div >
            <h3>{nombreEmpresa}</h3>
            <div className="socialNetwortEmpty">
                <SocialNetwork href={'https://www.instagram.com/'} children={'instagram'}/>
                <SocialNetwork href={'https:/es-es.facebook.com/'} children={'facebook'}/>
            </div>
        </div>
        <p>{descripcionGeneral}</p>
        <p>{fecha} {plazas}</p>
    </section>
)
}
export default ActividadLista