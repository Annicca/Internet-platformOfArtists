import { async } from 'q';
import React, { useEffect } from 'react';

export const Home = ()=>{
  
  useEffect(() =>{
    (
    async () =>{
      await fetch(`https://localhost:44344/api/users/user`,{
        headers:{'Content-Type': 'application/json'},
        credentials: `include`
      });
    } 
    )();
  });

  return (
    <div>

    </div>
  );
}

