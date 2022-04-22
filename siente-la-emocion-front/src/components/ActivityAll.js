import './Forms/activityForm.css';

export const ActivityText1 = ({ image, answer, question }) => {
  return (
    <div className='activity'>
      <img
        className='activity-img'
        src={
          image
            ? image
            : 'https://blogdigital.es/wp-content/uploads/2015/09/imagen-no-encontrada.jpg'
        }
        alt='logo'
      />
      <div className='question-box'>
        <p className='question'>{question}</p>
      </div>
      <div className='answer-box'>
        <p className='answer'>{answer}</p>
      </div>
    </div>
  );
};
