import { async } from 'q';
import React, { useEffect, useState } from 'react';

export const Home = ({user})=>{

  return (
      <div className='main-container'>
         {user === undefined || user === null ? 'You are not login' : 'Hi '+ user.nameUser} 
      </div>
  );
}

