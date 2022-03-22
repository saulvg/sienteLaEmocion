import React, { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import Input, { Textarea } from '../../components/Input/ComponentInput';
import NumberFormat from 'react-number-format';
import './perfil.css';
import Header from '../../components/Header/Header';
import Review from '../../components/Review/Review';
import useUser from '../../hooks/useUser';
import { useContext, useEffect } from 'react';

import decode from 'jwt-decode';
import useActivities from '../../hooks/useActivities';
export const Perfil = () => {
  const { token, user } = useUser();
  const [userName, setUserName] = useState({ field: '', valid: null });
  const [nameUser, setNameUser] = useState({ field: '', valid: null });
  const [email, setEmail] = useState({ field: '', valid: null });
  const [phone, setPhone] = useState({ field: '', valid: null });
  const [aboutMe, setAboutMe] = useState({ field: '', valid: null });
  //const [vote, setVote] = useState({ field: '', valid: null });
  const [review, setReview] = useState({ field: '', valid: null });
  const { activities } = useActivities();
  const [formOk, setFormOk] = useState(null);
  const [postReview, setPostReview] = useState(null);
  const expresions = {
    userName: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nameUser: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/, // 7 a 14 numeros.
    aboutMe: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  };
  const onSubmit2 = (e) => {
    e.preventDefault();
    if (/*vote.valid === 'true' &&  */ review.valid === 'true') {
      setPostReview(true);
      //setVote({ field: '', valid: null });
      //si los campos estan rellenados se envía (true) y vuelve a estar en
      // blanco ( '', null)
      setReview({ field: '', valid: null });
    } else {
      setPostReview(false);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      userName.valid === 'true' &&
      nameUser.valid === 'true' &&
      aboutMe.valid === 'true' &&
      email.valid === 'true' &&
      phone.valid === 'true'
    ) {
      setFormOk(true);
      setUserName({ field: '', valid: '' });
      setNameUser({ field: '', valid: null });
      setAboutMe({ field: '', valid: null });
      setEmail({ field: '', valid: null });
      setPhone({ field: '', valid: null });

      // ...
    } else {
      setFormOk(false);
    }
    const edit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/users/${decoded.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
          }
        );

        const body = await res.json();
        if (res.ok) {
          console.log(body);
        } else {
          console.error('Error', body.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const decoded = decode(token);
  };
  return (
    <>
      <header className='cabecera'>
        <Header className='headerPerfil' to={'/perfil'} body='aaaaa' />
      </header>

      {token && user ? (
        <main className='Ccontainer-profile'>
          <section className='Cuser-profile'>
            <div className='Cbackground-color-2'>
              <div className='Cbackground-color-1'>
                <div></div>
                <form onSubmit={onSubmit} className='Cinfo-user'>
                  {' '}
                  <img
                    className='Cavatar '
                    src={'http://localhost:4000/uploads/' + user.avatar}
                    alt='Avatar'
                  ></img>
                  <Input
                    state={userName}
                    setState={setUserName}
                    type='text'
                    label='Usuario'
                    placeholder={user.username}
                    name='userName'
                    expReg={expresions.userName}
                  />
                  <Input
                    state={nameUser}
                    setState={setNameUser}
                    type='text'
                    label='Nombre y apellidos'
                    name='nameUser'
                    expReg={expresions.nameUser}
                  />
                  <Input
                    state={email}
                    setState={setEmail}
                    type='email'
                    label='Email'
                    placeholder={user.email}
                    name='email'
                    expReg={expresions.email}
                  />
                  <Input
                    state={phone}
                    setState={setPhone}
                    type='phone'
                    label='Teléfono'
                    placeholder={
                      <NumberFormat value={user.phone} displayType={'number'} />
                    }
                    name='phone'
                    expReg={expresions.phone}
                  />
                  <Textarea
                    className='about-me'
                    state={aboutMe}
                    setState={setAboutMe}
                    type='text'
                    label='Sobre mí'
                    name='aboutMe'
                    expReg={expresions.aboutMe}
                    placeholder='uhhhh'
                  />
                  {formOk === false && (
                    <p className='errorData'>
                      Por favor rellena los campos correctamente
                    </p>
                  )}
                  <div className='save-button'>
                    <button className='save' type='submit'>
                      Guardar
                    </button>
                    {formOk === true && (
                      <p className='message-ok'>Actualizado!</p>
                    )}
                    <Modal
                      buttonName='Eliminar cuenta'
                      titleModal='¿Estás segur@ de que quieres 
                       eliminar tu cuenta?'
                      buttonClick='eliminar'
                    ></Modal>{' '}
                  </div>{' '}
                </form>
              </div>
            </div>
          </section>
          <section className='user-experiences'>
            <h2>Mis experiencias </h2>
            {activities.map((activity) => {
              return (
                <>
                  <p>{activity.id}</p>
                  <Modal
                    className='modal-review'
                    buttonName='Añadir valoración'
                    content={<Review />}
                  />
                </>
              );
            })}
            <div>aaaaa</div>
          </section>
        </main>
      ) : (
        <div>hola</div>
      )}
    </>
  );
};

/*
<section className='user-experiences'>
                <h2>Mis experiencias </h2>
                <Modal
                  className='modal-review'
                  buttonName='Añadir valoración'
                  content={
                    <form onSubmit={onSubmit2}>
                      <Textarea
                        className='review'
                        state={review}
                        setState={setReview}
                        type='text'
                        label='AAAA'
                        name='review'
                        expReg={expresions.aboutMe}
                        placeholder='aaaadadw'
                      />
                      {postReview === false && (
                        <p className='errorReview'>
                          La review no puede estar vacía
                        </p>
                      )}
                      <div className='send-review'>
                        <button
                          className='send'
                          type='submit'
                          onClick={console.log('enviado')}
                        >
                          Enviar valoración
                        </button>
                        {postReview === true && <p className=''>Enviada!</p>}
                      </div>
                    </form>
                  }
                />
              </section>





return users.length > 0 ? (
    {users.map((user) => {
      return (
        <>
          <header className='cabecera'>
            <Header className='headerPerfil' to={'/perfil'} body='aaaaa' />
          </header>
          <main className='container-profile'>
            <section className='user-profile'>
              <div className='background-color-2'>
                <div className='background-color-1'>
                  <div>{/*componenteAVATAR*}</div>
                  <p>{user.username(console.log('aaaa'))}</p>
                  <form onSubmit={onSubmit} className='info-user'>
                    <Input
                      state={userName}
                      setState={setUserName}
                      type='text'
                      label='Usuario'
                      placeholder={user.username}
                      name='userName'
                      expReg={expresions.userName}
                    />
                    <Input
                      state={nameUser}
                      setState={setNameUser}
                      type='text'
                      label='Nombre y apellidos'
                      name='nameUser'
                      expReg={expresions.nameUser}
                    />
                    <Input
                      state={email}
                      setState={setEmail}
                      type='email'
                      label='Email'
                      name='email'
                      expReg={expresions.email}
                    />
                    <Input
                      state={phone}
                      setState={setPhone}
                      type='phone'
                      label='Teléfono'
                      name='phone'
                      expReg={expresions.phone}
                    />
                    <Textarea
                      className='about-me'
                      state={aboutMe}
                      setState={setAboutMe}
                      type='text'
                      label='Sobre mí'
                      name='aboutMe'
                      expReg={expresions.aboutMe}
                      placeholder='uhhhh'
                    />
                    {formOk === false && (
                      <p className='errorData'>
                        Por favor rellena los campos correctamente
                      </p>
                    )}
                    <div className='save-button'>
                      <button className='save' type='submit'>
                        Guardar
                      </button>
                      {formOk === true && (
                        <p className='message-ok'>Actualizado!</p>
                      )}
                      <Modal
                        buttonName='Eliminar cuenta'
                        titleModal='¿Estás segur@ de que quieres 
                     eliminar tu cuenta?'
                        buttonClick='eliminar'
                      ></Modal>{' '}
                    </div>{' '}
                  </form>
                </div>
              </div>
            </section>
            <section className='user-experiences'>
              <h2>Mis experiencias </h2>
              <Modal
                className='modal-review'
                buttonName='Añadir valoración'
                content={
                  <form onSubmit={onSubmit2}>
                    <Textarea
                      className='review'
                      state={review}
                      setState={setReview}
                      type='text'
                      label='AAAA'
                      name='review'
                      expReg={expresions.aboutMe}
                      placeholder='aaaadadw'
                    />
                    {postReview === false && (
                      <p className='errorReview'>
                        La review no puede estar vacía
                      </p>
                    )}
                    <div className='send-review'>
                      <button
                        className='send'
                        type='submit'
                        onClick={console.log('enviado')}
                      >
                        Enviar valoración
                      </button>
                      {postReview === true && <p className=''>Enviada!</p>}
                    </div>
                  </form>
                }
              />
            </section>
          </main>
        </>
      );
    })
  ) : (
    <div>no hay</div>
  );
};


return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.id}>
            <section className='actividad'>
              <article className='review'>
                <div className='texto'>
                  <p>{user.email}jiohjuihluih</p>{' '}
                </div>
              </article>
            </section>
          </li>
        );
      })}
    </ul>
  );
  

*/
