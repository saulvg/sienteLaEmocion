//import './style.css';
import useUser from '../../hooks/useUser';
import './perfil.css';
//import UserPerfil from '../../components/EditProfile/UserPerfil';
import { Navigate } from 'react-router';
import EditProfile from '../../components/EditProfile/EditProfile';
import useActivities from '../../hooks/useActivities';
import { Modal } from '../../components/Modal/Modal';
import Review from '../../components/Review/Review';
import Header from '../../components/Header/Header';
import DeleteAccount from '../../components/Forms/DeleteAccount';

const ProfilePage = () => {
  const { activities } = useActivities();
  return (
    <>
      <header className='cabecera'>
        <Header className='headerPerfil' to={'/perfil'} body='aaaaa' />
      </header>
      <body className='container-profile'>
        <div className='sections'>
          <section className='u-profile'>
            <EditProfile />
          </section>
          <section className='u-experiences'>
            <h2>Mis experiencias </h2>
            {activities.map((activity) => {
              return (
                <>
                  <p>{activity.id}</p>
                </>
              );
            })}
            <Modal
              className='modal-review'
              buttonName='Añadir valoración'
              content={<Review />}
            />
            <div>aaaaa</div>
          </section>
        </div>
      </body>
    </>
  );
};

export default ProfilePage;
