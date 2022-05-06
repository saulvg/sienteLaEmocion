import './Forms/activityForm.css';

export const ActivityText1 = ({
  image,
  answer,
  question,
  questionBox,
  answerBox,
  activityClass,
}) => {
  return (
    <div className={activityClass}>
      <img className='activity-img' src={image} alt='logo' />
      <div className={questionBox}>
        <p className='question'>{question}</p>
      </div>
      <div className={answerBox}>
        <p className='answer'>{answer}</p>
      </div>
    </div>
  );
};
