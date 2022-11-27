import React, {useEffect} from 'react';
import { useUser } from '../hooks/useUser';
import { getCookie } from 'react-use-cookie';
export const Home = ()=>{

  const {user} = useUser();

  // const [userLogining, setUserLogining] = useState(null);
  useEffect(() =>{
  //   const getUserLogining = async() =>{
  //     await axios({
  //       method: 'get',
  //       url: 'https://localhost:44344/api/users/user',
  //       headers:{'Content-Type': 'application/json'},
  //       credentials: `include`
  //     })
  //     .then((resp) => setUser(resp.data))
  //     .catch((error) => console.log(error));
  //   }
  //   getUserLogining();
   console.log(getCookie('jwt'));
    (async () =>{
        const res = 
          await fetch(`https://localhost:44344/api/users/user`,{
            method: 'GET',
            headers:{'Authorization': 'Bearer'+ getCookie('jwt')},
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