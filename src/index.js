import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';




function SerchForm(props) {
  return (
    <form className='form'>
      <div className='form-group'>
        <input name='worl'
          type='text'
          placeholder='World...'
          id='worl-input'
          value={props.world}
          onChange = {(e) => props.onChange(e.target.value)}></input>
      </div> 

      <button type='submit'>Search</button>
    </form>
  )
}

function Resalt() {
  return (
    <div className='results'>
    <div className='res-info'>
      <div className='res-eorld'>Res</div>
      <div className='res-sound'>
        <img src="./sound.png" alt='Play  sound' />
      </div>
    </div>
  </div>
  )
}




function Body() {
  const [world, setWorld] = useState("");

  const handleCangeText = (text)=>{
    setWorld(text);
  }

  return (
    <div className='app'>
      <div className='main'>
        <h1>Dictionary</h1>
        <SerchForm onChange = {handleCangeText} world = {world}/>
        <div className='error'>World not found</div>
        <Resalt />

        <div className='res-list'>
          list
        </div>
      </div>
    </div>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Body />
);


