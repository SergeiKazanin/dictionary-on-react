import React, { useState, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import { brown } from "@mui/material/colors";

const themes = {
  light: {
    theme: "light",
    light: "light",
    colorButton: brown[900],
  },
  dark: {
    theme: "dark",
    light: "dark-light",
    colorButton: brown[200],
  },
};

const ThemeContext = React.createContext(themes.light);

function SearchForm(props) {
  const theme = useContext(ThemeContext);
  return (
    <form className={`form ${theme.light}`} onSubmit={(e) => props.onSubmit(e)}>
      <div className="form-group">
        <TextField
          id="outlined-basic"
          onChange={(e) => props.onChange(e)}
          value={props.world}
          label="Word"
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

function Result(props) {
  const theme = useContext(ThemeContext);
  if (props.world.length) {
    const res = props.objWorld.lexicalEntries;
    return (
      <div className={`results ${theme.light}`}>
        <div className="res-info">
          <div className="res-world">{props.world}</div>
          <div className="res-sound">
            <IconButton aria-label="volumeUp" onClick={() => props.onClick()}>
              <VolumeUpIcon sx={{ fontSize: 40, color: theme.colorButton }} />
            </IconButton>
          </div>
        </div>
        {/* <div className="res-list">
          <div>
            <p>{meanings.partOfSpeech.toLocaleUpperCase()}</p>
          </div>
          <div>
            <p>{res.phonetic}</p>
          </div>
          <div>
            <Link
              href={res.sourceUrls[0]}
              underline="hover"
              rel="noreferrer"
              target="_blank"
            >
              Wiktionary.org about "{props.world}"
            </Link>
          </div>
          <div className="phrase">
            <PrintArr p={"Antonyms"} arr={meanings.antonyms} />
            <PrintArr p={"Synonyms"} arr={meanings.synonyms} />
          </div>
          <PrintArrObj p={"Definitions"} arr={meanings.definitions} />
        </div> */}
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
  //const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const url =
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [world, setWorld] = useState("");
  const [sechWorld, setSechWorld] = useState("");
  const [error, setError] = useState(false);
  const [objWorld, setObjWorld] = useState({
    sound: [],
    lexicalEntries: {},
  });

  const handleChangeText = (e) => {
    setWorld(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!world.trim()) return;

    try {
      const resp = await fetch(
        `${url}${world}?key=34c69346-780e-4ac3-a06e-709641223ea1`
      );
      const respRes = await resp.json();

      if (resp.ok && respRes.length) {
        console.log(respRes[0]);
        setError(false);
        setSechWorld(world);
        setObjWorld((objWorld) => ({
          ...objWorld,
          sound: respRes[0].hwi.prs[0].sound,
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
    if (objWorld.sound) {
      const sound = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${objWorld.sound.audio.charAt(0)}/${objWorld.sound.audio}.mp3`;
      console.log(sound);
      new Audio(sound).play();
    }
  };

  const handleChangeTheme = () => {
    setCurrentTheme(currentTheme.theme === "dark" ? themes.light : themes.dark);
  };

  function SetIconDarkMode(props) {
    if (props.mode.theme === "light") {
      return (
        <LightModeIcon sx={{ fontSize: 40, color: currentTheme.colorButton }} />
      );
    } else {
      return (
        <DarkModeIcon sx={{ fontSize: 40, color: currentTheme.colorButton }} />
      );
    }
  }

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="app">
        <div className={`main ${currentTheme.theme}`}>
          <h1>Dictionary</h1>
          <div className="SelectTheme">
            <IconButton onClick={() => handleChangeTheme()}>
              <SetIconDarkMode mode={currentTheme} />
            </IconButton>
          </div>
          <SearchForm
            onChange={handleChangeText}
            onSubmit={handleSubmit}
            world={world}
          />
          <ErrorRes errorTrue={error} />
          <Result world={sechWorld} objWorld={objWorld} onClick={handleSound} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);
