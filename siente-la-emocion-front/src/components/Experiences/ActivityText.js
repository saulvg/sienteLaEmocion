// ## Style ##
import '../Forms/activityForm.css';

//Componente que pinta los cuadros de texto de 'Expereince'
//Recibe props, image(imagen asociada a el texto), answer(Pregunta relacionada al box), question(respuesta relacionada al box), questionBox, answerBox y activityClass (clases para darle estilos)
export const ActivityText = ({
  image,
  answer,
  question,
  questionBox,
  answerBox,
  activityClass,
}) => {
  return (
    <div className={activityClass}>
      <img className='activity-img' data-aos='zoom-in' src={image} alt='logo' />
      <div className={questionBox} data-aos='fade-up-left'>
        <p className='question'>{question}</p>
      </div>
      <div className={answerBox} data-aos='fade-up-left'>
        <p className='answer'>{answer}</p>
      </div>
    </div>
  );
};
