// ## Style ##
import './socialNetwork.css';

//Componente que pinta las redes sociales, recibe como props un id, un href(para redirigirnos al las diferentes redes sociales de cada empresa), un children('valor' del link)
const SocialNetwork = ({ id, href, children }) => {
  return (
    <div id={id} className='networks' data-aos='flip-right'>
      <a href={href} target={'_blank'} rel='noopener noreferrer'>
        {children}
      </a>
    </div>
  );
};
export default SocialNetwork;
