import React, {useEffect} from 'react';
import { useUser } from '../hooks/useUser';
import { getCookie } from 'react-use-cookie';
export const Home = ()=>{

  const {user} = useUser();
  useEffect(() =>{
   let token = getCookie();
    (async () =>{
        const res = 
          await fetch(`https://localhost:44344/api/users/user`,{
            method: 'GET',
            headers:{Authorization: `Bearer + ${token}`,'Content-Type': 'application/json'}, 
            withCredentials: true ,
            credentials: 'include',
        });
        try{
          const content = await res.json();
          console.log(content)
        }catch(error){
          console.error(error)
        }
    })();
    }, []);

  return (
      <div className='main-container'>
         {user == null ? 'You are not login' : 'Hi '+ user.nameUser} 
      </div>
  )
}