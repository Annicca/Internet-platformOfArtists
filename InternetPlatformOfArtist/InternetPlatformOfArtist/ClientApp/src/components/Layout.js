import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './nav/NavMenu';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <>
        <div className='wrapper'>
          <Header />
          <NavMenu />
            <Container>
              {this.props.children}
            </Container>
        </div>
        <Footer />
      </>
    );
  }
}
