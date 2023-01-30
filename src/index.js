import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function SerchForm(props) {
  return (
    <form className='form' onSubmit={(e) => props.onSabmit(e)}>
      <div className='form-group'>
        <TextField
          id="outlined-basic"
          onChange={(e) => props.onChange(e)}
          value={props.world}
          label="World"
          variant="outlined"
          size="small"
          fullWidth={true}
        />
      </div>
      <Button type='submit' variant="contained">Search</Button>
    </form>
  )
}

function Resalt(props) {
  return (
    <div className='results'>
      <div className='res-info'>
        <div className='res-eorld'>{props.world}</div>
        <div className='res-sound'>
          <VolumeUpIcon />
        </div>
      </div>
      <div className='res-list'>
        list
      </div>
    </div>
  )
}

function Body() {
  const url = 'https://od-api.oxforddictionaries.com/api/v2/entries/RU/';
  const appId = 'aaa8ae77';
  const appKey = '72decbb2a6dc1119afbe9368d28e9126';

  const [world, setWorld] = useState("");
  const [sechWorld, setsechWorld] = useState("");

  const handleCangeText = (e) => {
    setWorld(e.target.value);
  }

  const onSabmit = async (e) => {
    e.preventDefault();

    if (!world.trim()) return;

    try {
      const resp = await fetch(`${url}${world}`, {
        headers: {
          "app_id": appId,
          "app_key": appKey
        }
      });
      const respRes = await resp.json();
      console.log(resp)
      if (resp.os && respRes.length) {
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

        <Resalt world={sechWorld} />

      </div>
    </div>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Body />
);


