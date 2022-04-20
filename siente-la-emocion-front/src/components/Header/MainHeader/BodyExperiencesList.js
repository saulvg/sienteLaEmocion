import SocialNetwork from '../../SocialNetwork/SocialNetwork';

import useActivity from '../../../hooks/useActivity';
import Error from '../../error/Error';
const BodyExperiencesList = ({ randomActivity }) => {
  const { activity, error } = useActivity(randomActivity);
  return activity ? (
    <div className='activity-header-body'>
      <h1>Sientelo pronto...</h1>
      <div className='activity-description'>
        <h3>{activity.company}</h3>
        <p>{activity.experience.text_4}</p>
        <div className='socialNetworks flex-end'>
          <SocialNetwork
            id={'miniInstagram'}
            children={'instagram'}
            className={'mini'}
          />
          <SocialNetwork
            id={'miniFacebook'}
            href={'https:/es-es.facebook.com/'}
            children={'facebook'}
            className={'mini'}
          />
        </div>
      </div>
    </div>
  ) : (
    <Error>{error}</Error>
  );
};
export default BodyExperiencesList;
