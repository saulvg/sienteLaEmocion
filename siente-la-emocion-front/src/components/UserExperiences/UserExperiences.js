import useUser from '../../hooks/useUser';
import { Modal } from '../Modal/Modal';
import Review from '../Review/Review';
import './UserExperiences.css';
// HACER COMPONENTE DE MIS EXPERIENCIAS + MODAL HACER REVIEW

const UserExperiences = ({ oldName, oldEmail }) => {
  const { token, user } = useUser();

  return (
    <>
      {token && user ? (
        <div className='background-color-3'>
          <div className='background-color-4'>
            <div className='my-experiences'>
              <Modal
                className='modal-review'
                buttonName='Añadir valoración'
                content={<Review />}
              />
            </div>
          </div>{' '}
        </div>
      ) : (
        <>
          <div className='otro'>aa</div>
        </>
      )}
    </>
  );
};

export default UserExperiences;
/**/
