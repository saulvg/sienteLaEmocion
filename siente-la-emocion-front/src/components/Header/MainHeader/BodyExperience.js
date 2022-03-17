import './bodyExperience.css';
import useActivities from '../../../hooks/useActivities';
const BodyActivitis = () => {
  const { activities } = useActivities();
  const experience = activities.find((id) => id.id === 29);
  console.log(experience);
  return (
    <div className='headerBody bodyExperience'>
      <h1>Barranquismo</h1>
      <div>
        <section className='queIncluye textHeaderLeft'>
          <h3>Que incluye?</h3>
          <p>{experience.text_1}</p>
        </section>
        <section className='queNecesitas textHeaderRigth'>
          <h3>Que necesitas?</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </p>
        </section>
        <section className='cuantoDura textHeaderLeft'>
          <h3>
            Cuanto dura la experiencia?
            <br />
            Cuando se realiza?
          </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </p>
        </section>
        <section className='valoraciones textHeaderRigth'>
          <h3>Valoraciones</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </section>
      </div>
    </div>
  );
};
export default BodyActivitis;
