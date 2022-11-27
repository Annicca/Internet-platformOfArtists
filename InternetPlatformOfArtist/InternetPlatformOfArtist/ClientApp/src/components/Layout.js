import React, { Component } from 'react';
import { NavMenu } from './nav/NavMenu';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import { Outlet } from 'react-router-dom';


const Layout = () =>{
   
    return (
      <div className='wrapper'>
          <div className = 'content'>
            <Header />
            <NavMenu />
            <main>
              <Outlet/>
            </main>
          </div>
          <Footer />
      </div>
    );
}
export {Layout}
