//import logo from './logo.svg';
//import './App.css';

/**
 * #################
 * ## Componentes ##
 * #################
 */
import CircleHomePage from './components/CircleHomePage/CircleHomePage'
import SocialNetwork from './components/SocialNetwork/SocialNetwork';
import TextHomePage from './components/TextHomePage/TextHomePage';

function App() {
  return (
    <div className="App">
      <main>
        <section id='we'>
          <CircleHomePage id={'routeDeQueVaEsto'} href={'#deQueVaEsto'} children={'De que trata esto'}/>
          <CircleHomePage id={'routeComents'} href={'#coments'} children={'Comentarios'}/>
          <CircleHomePage id={'nuestrosPrincipios'} href={'#nuestrosPrincipios'} children={'Nuestros principios'}/>
          <CircleHomePage id={'queTeEstaEsperando'} href={'#queTeEstaEsperando'} children={'Que te esta esperando'}/>
        </section>
        <section id='deQueVaEsto'>
          <TextHomePage title={'De que va esto'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
          </TextHomePage>
        </section>
        <section id='socialNetworks'>
          <SocialNetwork id={'instagram'} href={'https://www.instagram.com/'} children={'instagram'}/>
          <SocialNetwork id={'gmail'} href={'https://www.google.com/intl/es/gmail/about/'} children={'gmail'}/>
          <SocialNetwork id={'facebook'} href={'https:/es-es.facebook.com/'} children={'facebook'}/>
        </section>
        <section id='nuestrosPrincipios'>
          <TextHomePage title={'Nuestros principios'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
          </TextHomePage>
        </section>
        <section id='coments'>
          <CircleHomePage id={'comment1'} children={'Comentario destacado 1'}/>
          <CircleHomePage id={'comment2'} children={'Comentario destacado 2'}/>
          <CircleHomePage id={'comment3'} children={'Comentario destacado 3'}/>
        </section>
        <section id='queTeEstaEsperando'>
          <TextHomePage title={'Que te esta esperando'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
          </TextHomePage>
        </section>

      </main>
    </div>
  );
}

export default App;
