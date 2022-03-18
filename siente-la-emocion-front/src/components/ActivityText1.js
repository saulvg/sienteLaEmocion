import './activityForm.css';

export const ActivityText1 = ({ answer, question }) => {
  return (
    <div className='activity'>
      <img
        className='activity-img'
        src='https://w7.pngwing.com/pngs/522/295/png-transparent-computer-icons-encapsulated-postscript-mountain-angle-photography-triangle.png'
        alt='logo'
      />
      <div className='question-box'>
        <p className='question'>{question}?</p>
      </div>
      <div className='answer-box'>
        <p className='answer'>{answer}</p>
      </div>
    </div>
  );
};
