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
import useUserProfile from '../../hooks/useUserProfile';
import { Navigate } from 'react-router';
export const OtherProfile = () => {
  const { user } = useUserProfile();
  const { token } = useUser();
  if (token === user) {
    return <Navigate to='/perfil' />;
  }

  return (
    <>
      <header className='cabecera'>
        <Header className='headerPerfil' to={'/perfil'} body='aaaaa' />
      </header>

      {user ? (
        <main className='Ccontainer-profile'>
          <section className='Cuser-profile'>
            <div className='Cbackground-color-2'>
              <div className='Cbackground-color-1'>
                <div>{user.username}</div>
              </div>
            </div>
          </section>
          <section className='user-experiences'>
            <h2>Mis experiencias </h2>

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
