import React, { useEffect, useState } from 'react';
//import axios from "axios";

export const Home = ()=>{

  const [user, setUser] = useState(null);
  useEffect(() =>{
    // const getUserLogining = async() =>{
    //   await axios({
    //     method: 'get',
    //     url: 'https://localhost:44344/api/users/user',
    //     headers:{'Content-Type': 'application/json'},
    //     credentials: `include`
    //   })
    //   .then((resp) => setUser(resp.data))
    //   .catch((error) => console.log(error));
    // }
    // getUserLogining();
    (async () =>{
        const res = 
          await fetch(`https://localhost:44344/api/users/user`,{
            method: 'get',
            headers:{'Content-Type': 'application/json'},
            credentials: `include`,
        });

        const content = await res.json();

        console.log(content);
    })();
    }, []);

  return (
      <div className='main-container'>
         {user == null ? 'You are not login' : 'Hi '+ user.nameUser} 
      </div>
  );
}

