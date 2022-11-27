import React  from 'react';
export const Home = ()=>{

  const store =  require('store');
  const user = store.get('user');

  return (
      <div className='main-container'>
         {user == null ? 'You are not login' : 'Hi '+ user.nameUser} 
      </div>
  )
}