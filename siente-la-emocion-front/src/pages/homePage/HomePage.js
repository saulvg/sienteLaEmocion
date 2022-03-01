import './homePage.css';
/**
 * #################
 * ## Componentes ##
 * #################
 */
import CircleHomePage from '../../components/CircleHomePage/CircleHomePage';
import Header from '../../components/Header/Header';
import SocialNetwork from '../../components/SocialNetwork/SocialNetwork';
import TextHomePage from '../../components/TextHomePage/TextHomePage';
import BodyTitle from '../../components/Header/MainHeader/BodyTitle';

const HomePage = () => {
  return (
    <div className='App'>
      <Header
        to={'/listaActividades'}
        button={'Atrevete'}
        body={<BodyTitle />}
      />
      <main>
        <section id='we' className='interseccion'>
          <CircleHomePage
            id={'routeDeQueVaEsto'}
            clas={'homePage'}
            href={'#deQueVaEsto'}
            children={'De que trata esto'}
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
            children={'Que te esta esperando'}
          />
        </section>
        <section id='deQueVaEsto' className='textHPage'>
          <TextHomePage
            title={'De que va esto'}
            p1={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
            p2={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
            }
          />
        </section>
        <section id='socialNetworks' className='interseccion'>
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
        <section id='nuestrosPrincipios' className='textHPage'>
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
          <CircleHomePage id={'comment1'} children={'Comentario destacado 1'} />
          <CircleHomePage id={'comment2'} children={'Comentario destacado 2'} />
          <CircleHomePage id={'comment3'} children={'Comentario destacado 3'} />
        </section>
        <section id='queTeEstaEsperando' className='textHPage'>
          <TextHomePage
            title={'Que te esta esperando'}
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
