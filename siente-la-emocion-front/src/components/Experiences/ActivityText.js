import '../Forms/activityForm.css';

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
