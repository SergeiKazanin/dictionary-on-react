import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { ConstructionOutlined } from "@mui/icons-material";

function SerchForm(props) {
  return (
    <form className="form" onSubmit={(e) => props.onSabmit(e)}>
      <div className="form-group">
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
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>
  );
}

function ElBr(props) {
  return <li>{props.el}</li>;
}

function PrintArr(props) {
  if (props.arr.length) {
    return (
      <div>
        <p>{props.p}</p>
        <ul>
          {props.arr.map((el, i) => (
            <ElBr key={i} el={el} />
          ))}
        </ul>
      </div>
    );
  }
}

function PrintArrObj(props) {
  if (props.arr.length) {
    return (
      <div>
        <p>{props.p}</p>
        <ul>
          {props.arr.map((el, i) => (
            <ElBr key={i} el={el.definition} />
          ))}
        </ul>
      </div>
    );
  }
}

function Resalt(props) {
  if (props.world.length) {
    const res = props.objWorld.lexicalEntries;
    const meanings = props.objWorld.lexicalEntries.meanings[0];
    return (
      <div className="results">
        <div className="res-info">
          <div className="res-world">{props.world}</div>
          <div className="res-sound">
            <VolumeUpIcon
              sx={{ fontSize: 40 }}
              onClick={() => props.onClick()}
            />
          </div>
        </div>
        <div className="res-list">
          <div>
            <p>{meanings.partOfSpeech.toLocaleUpperCase()}</p>
          </div>
          <div>
            <p>{res.phonetic}</p>
          </div>
          <div>
            <a href={res.sourceUrls[0]} rel="noreferrer" target="_blank">
              Wiktionary.org about "{props.world}"
            </a>
          </div>
          <div className="phras">
            <PrintArr p={"Antonyms"} arr={meanings.antonyms} />
            <PrintArr p={"Synonymus"} arr={meanings.synonyms} />
          </div>
          <PrintArrObj p={"Definitions"} arr={meanings.definitions} />
        </div>
      </div>
    );
  }
}

function ErrorRes(props) {
  if (props.errorTrue) {
    return <div className="error">World not found</div>;
  }
}

function Body() {
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  const [world, setWorld] = useState("");
  const [sechWorld, setSechWorld] = useState("");
  const [error, setError] = useState(false);
  const [objWorld, setObjWorld] = useState({
    sound: [],
    lexicalEntries: {},
  });

  const handleCangeText = (e) => {
    setWorld(e.target.value);
  };

  const handleSabmit = async (e) => {
    e.preventDefault();

    if (!world.trim()) return;

    try {
      const resp = await fetch(`${url}${world}`);
      const respRes = await resp.json();
      console.log(respRes);
      if (resp.ok && respRes.length) {
        setError(false);
        setSechWorld(world);
        setObjWorld((ObjWorld) => ({
          ...ObjWorld,
          sound: respRes[0].phonetics,
          lexicalEntries: respRes[0],
        }));
      } else {
        setError(true);
        setSechWorld("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSound = () => {
    if (objWorld.sound?.length) {
      const sound = objWorld.sound[0].audio;
      new Audio(sound).play();
    }
  };

  return (
    <div className="app">
      <div className="main">
        <h1>Dictionary</h1>
        <SerchForm
          onChange={handleCangeText}
          onSabmit={handleSabmit}
          world={world}
        />
        <ErrorRes errorTrue={error} />
        <Resalt world={sechWorld} objWorld={objWorld} onClick={handleSound} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);
