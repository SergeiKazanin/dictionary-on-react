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
  if (props.world.length) {
    return (
      <div className='results'>
        <div className='res-info'>
          <div className='res-world'>{props.world}</div>
          <div className='res-sound' >
            <VolumeUpIcon sx={{ fontSize: 40 }} onClick={() => props.onClick()} />
          </div>
        </div>
        <div className='res-list'>
          list
        </div>
      </div>
    )
  }
}

function ErrorRes(props) {
  if (props.errorTrue) {
    return (<div className='error'>World not found</div>)
  }
}



function Body() {
  const url = 'http://localhost:8080/https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/';
  const appId = 'aaa8ae77';
  const appKey = '72decbb2a6dc1119afbe9368d28e9126';

  const [world, setWorld] = useState("");
  const [sechWorld, setSechWorld] = useState("");
  const [error, setError] = useState(false);
  const [ObjWorld, setObjWorld] = useState({
    sound: [],
  })

  const handleCangeText = (e) => {
    setWorld(e.target.value);
  }

  const handleSabmit = async (e) => {
    e.preventDefault();

    if (!world.trim()) return;

    try {
      const resp = await fetch(`${url}${world}`, {
        headers: {
          'app_id': appId,
          'app_key': appKey
        },
        credentials: "include",
      });
      const respRes = await resp.json();

      if (resp.ok && respRes.results.length) {
        setError(false);
        setSechWorld(world);
        const { results } = respRes;
        setObjWorld(ObjWorld => ({
          ...ObjWorld,
          sound: results[0].lexicalEntries[0].entries[0].pronunciations
        }));
        console.log(results[0])
      } else {
        setError(true);
        setSechWorld('');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSound = () => {
    if (ObjWorld.sound?.length) {
      const sound = ObjWorld.sound[0].audioFile
      new Audio(sound).play();
    }
  }

  return (
    <div className='app'>
      <div className='main'>
        <h1>Dictionary</h1>
        <SerchForm onChange={handleCangeText} onSabmit={handleSabmit} world={world} />
        <ErrorRes errorTrue={error} />
        <Resalt world={sechWorld} onClick={handleSound} />

      </div>
    </div>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Body />
);


