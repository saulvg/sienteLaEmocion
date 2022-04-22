import './Forms/activityForm.css';

export const ActivityText1 = ({ answer, question, questionBox, answerBox }) => {
  return (
    <div className='activity'>
      <img
        className='activity-img'
        src='https://w7.pngwing.com/pngs/522/295/png-transparent-computer-icons-encapsulated-postscript-mountain-angle-photography-triangle.png'
        alt='logo'
      />
      <div className={questionBox}>
        <p className='question'>{question}</p>
      </div>
      <div className={answerBox}>
        <p className='answer'>{answer}</p>
      </div>
    </div>
  );
};
