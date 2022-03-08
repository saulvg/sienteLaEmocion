import './socialNetwork.css';

const SocialNetwork = ({ id, href, children }) => {
  return (
    <div id={id} className='networks'>
      <a href={href} target={'_blank'} rel='noopener noreferrer'>
        {children}
      </a>
    </div>
  );
};
export default SocialNetwork;
