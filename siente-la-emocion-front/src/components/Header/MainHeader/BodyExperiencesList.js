import SocialNetwork from '../../SocialNetwork/SocialNetwork';

const BodyExperiencesList = () => {
  return (
    <div className='activity-header-body'>
      <h1>Sientelo pronto...</h1>
      <div className='activity-description'>
        <h3>Nombre Empresa</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting.
        </p>
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
  );
};
export default BodyExperiencesList;
