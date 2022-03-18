import './bodyExperience.css';
import useActivities from '../../../hooks/useActivities';
const BodyActivitis = () => {
  const { activities } = useActivities();
  const experience = activities.find((id) => id.id === 1);  
  return (
    experience ? (
    <div className='headerBody bodyExperience'>
      <h1>Barranquismo</h1>
      <div>
        <section className='queIncluye textHeaderLeft'>
          <h3>Que incluye?</h3>
          {experience ? <p>{experience.text_1}</p> : <p><div className='loading'></div></p> }
        </section>
        <section className='queNecesitas textHeaderRigth'>
          <h3>Que necesitas?</h3>
          <p>{experience.text_2}</p>
        </section>
        <section className='cuantoDura textHeaderLeft'>
          <h3>
            Cuanto dura la experiencia?
            <br />
            Cuando se realiza?
          </h3>
          <p>{experience.text_3}</p>
        </section>
        <section className='valoraciones textHeaderRigth'>
          <h3>Valoraciones</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </section>
      </div>
    </div>) : <div className='loading'>No hay textos de cabezera</div>
  )
};
export default BodyActivitis;
