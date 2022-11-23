import { async } from 'q';
import React, { useEffect, useState } from 'react';

export const Home = ({user})=>{

  return (
    <main>
        <div className='main-container'>
         {user ? 'Hi '+ user.nameUser : 'You are not login'} 
      </div>
    </main>

  );
}

