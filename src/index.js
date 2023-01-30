import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';



function SerchForm(props) {
  return (
    <form className='form' onSubmit={(e) => props.onSabmit(e)}>
      <div className='form-group'>
        <input name='worl'
          type='text'
          placeholder='World...'
          id='worl-input'
          value={props.world}
          onChange={(e) => props.onChange(e)}></input>
      </div>

      <button type='submit'>Search</button>
    </form>
  )
}

function Resalt(props) {
  return (
    <div className='results'>
      <div className='res-info'>
        <div className='res-eorld'>{props.world}</div>
        <div className='res-sound'>
          <img id='imgSound' src="./sound.png" alt='Play sound' />
        </div>
      </div>
      <div className='res-list'>
          list
      </div>
    </div>
  )
}

function Body() {
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  const [world, setWorld] = useState("");
  const [sechWorld, setsechWorld] = useState("");

  const handleCangeText = (e) => {
    setWorld(e.target.value);
  }

  const onSabmit = async (e) => {
    e.preventDefault();

    if (!world.trim()) return;

    try {
      const resp = await fetch(`${url}${world}`);
      const respRes = await resp.json();
      console.log(resp)
      if(resp.os && respRes.length){
        setsechWorld(world);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='app'>
      <div className='main'>
        <h1>Dictionary</h1>
        <SerchForm onChange={handleCangeText} onSabmit={onSabmit} world={world} />

        <div className='error'>World not found</div>

        <Resalt world = {sechWorld}/>

      </div>
    </div>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Body />
);


