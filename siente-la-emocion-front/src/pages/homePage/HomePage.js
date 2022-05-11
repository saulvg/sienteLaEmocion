// ## Style ##
import './homePage.css';
import '../../components/Header/header.css';
/**
 * #################
 * ## Componentes ##
 * #################
 */
import CircleHomePage from '../../components/CircleHomePage/CircleHomePage';
import Header from '../../components/Header/Header';
import SocialNetwork from '../../components/SocialNetwork/SocialNetwork';
import TextHomePage from '../../components/TextHomePage/TextHomePage';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import { ExperienceDetail } from '../../components/Experiences/Experience-detail';

//Pagina que pinta la entrada a la web
const HomePage = () => {
  //Devolvemos todos los componentes que deseamos pintar
  return (
    <div className='App'>
      <Header
        bg={'/img/principal.jpg'}
        to={'/allexperiences'}
        button={'Atrévete'}
        body={<BodyHeaderHomePage />}
      />
      <main>
        <section id='we' className='interseccion'>
          <CircleHomePage
            id={'routeDeQueVaEsto'}
            clas={'homePage'}
            href={'#deQueVaEsto'}
            children={'De qué trata esto'}
          />
          <CircleHomePage
            id={'routeComents'}
            clas={'homePage'}
            href={'#coments'}
            children={'Comentarios'}
          />
          <CircleHomePage
            id={'routeNuestrosPrincipios'}
            clas={'homePage'}
            href={'#nuestrosPrincipios'}
            children={'Nuestros principios'}
          />
          <CircleHomePage
            id={'routeQueTeEstaEsperando'}
            clas={'homePage'}
            href={'#queTeEstaEsperando'}
            children={'Qué te está esperando'}
          />
        </section>
        <section id='deQueVaEsto' className='textHPage background-img'>
          <TextHomePage
            title={'De qué va esto'}
            p1={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
            p2={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
          />
        </section>
        <section id='socialNetworks' className='socialMedia'>
          <SocialNetwork
            id={'instagram'}
            href={'https://www.instagram.com/'}
            children={'instagram'}
          />
          <SocialNetwork
            id={'gmail'}
            href={'https://www.google.com/intl/es/gmail/about/'}
            children={'gmail'}
          />
          <SocialNetwork
            id={'facebook'}
            href={'https:/es-es.facebook.com/'}
            children={'facebook'}
          />
        </section>
        <section id='nuestrosPrincipios' className='textHPage background-img'>
          <TextHomePage
            title={'Nuestros principios'}
            p1={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
            p2={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
          />
        </section>
        <section id='coments' className='interseccion'>
          <ExperienceDetail
            experienceImg='/img/1.svg'
            description='Seguridad garantizada'
          />
          <ExperienceDetail
            experienceImg='/img/2.svg'
            description='Diversión ante todo'
          />
          <ExperienceDetail
            experienceImg='/img/3.svg'
            description='Cuidamos de la naturaleza'
          />
        </section>
        <section id='queTeEstaEsperando' className='textHPage background-img'>
          <TextHomePage
            title={'Qué te está esperando'}
            p1={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
            p2={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
          />
        </section>
        <section className='interseccionBlanco' />
      </main>
    </div>
  );
};
export default HomePage;
