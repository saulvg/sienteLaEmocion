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
import UserExperiences from '../../components/UserExperiences/UserExperiences';

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
            <h2 className='title-experiences'>Mis experiencias </h2>
            <UserExperiences />
          </section>
        </div>
      </body>
    </>
  );
};

export default ProfilePage;
