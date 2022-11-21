import { async } from 'q';
import React, { useEffect, useState } from 'react';

export const Home = ({user})=>{

  return (
    <div>
      {user ? 'Hi '+ user.nameUser : 'You are not login'} 
    </div>
  );
}

