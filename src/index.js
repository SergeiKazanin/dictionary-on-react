import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

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
    <form
      className="flex justify-between gap-3 w-full p-2 rounded-md border-2"
      onSubmit={(e) => props.onSubmit(e)}
    >
      <div className="w-full">
        <TextField
          id="outlined-basic"
          onChange={(e) => props.onChange(e)}
          value={props.word}
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

function PrintArr(props) {
  if (props.arr?.length) {
    return (
      <div>
        <p>{props.p}</p>
        <ul className="ml-3">
          {props.arr.map((el, i) => (
            <li key={i}> {el} </li>
          ))}
        </ul>
      </div>
    );
  }
}

function PrintArrObj(props) {
  if (props.arr?.length) {
    return (
      <div>
        <p>{props.p}</p>
        <ul className="ml-3">
          {props.arr.map((el, i) => (
            <li key={i}> {el.drp} </li>
          ))}
        </ul>
      </div>
    );
  }
}

function Result(props) {
  const theme = useContext(ThemeContext);
  if (props.word.length) {
    const res = props.objWord.lexicalEntries;
    return (
      <div className="p-2 border-2 rounded-md w-full flex flex-col gap-3 justify-center">
        <div className="flex justify-between items-center gap-3 w-full rounded-md border-2 border-stone-900">
          <div className="text-2xl ml-3">{props.word}</div>
          <div className="res-sound">
            <IconButton aria-label="volumeUp" onClick={() => props.onClick()}>
              <VolumeUpIcon sx={{ fontSize: 30, color: theme.colorButton }} />
            </IconButton>
          </div>
        </div>
        <div className="res-list">
          <div>
            <p>{res.fl}</p>
          </div>
          {}
          <div>
            <p>{res.hwi?.prs !== undefined ? res.hwi.prs[0].mw : null}</p>
          </div>
          <PrintArr p={"Definitions"} arr={res.shortdef} />
          <PrintArrObj p={"Phrasal verb"} arr={res.dros} />
        </div>
      </div>
    );
  }
}

function ErrorRes(props) {
  if (props.errorTrue) {
    return <div className="error">Word not found</div>;
  }
}

function Body() {
  const url =
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [word, setWord] = useState("");
  const [sechWord, setSechWord] = useState("");
  const [error, setError] = useState(false);
  const [objWord, setObjWord] = useState({
    sound: [],
    lexicalEntries: {},
  });

  const handleChangeText = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!word.trim()) return;

    try {
      const resp = await fetch(
        `${url}${word}?key=34c69346-780e-4ac3-a06e-709641223ea1`
      );
      const respRes = await resp.json();

      if (resp.ok && respRes.length) {
        setError(false);
        setSechWord(word);
        setObjWord((objWord) => ({
          ...objWord,
          sound: respRes[0].hwi,
          lexicalEntries: respRes[0],
        }));
      } else {
        setError(true);
        setSechWord("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSound = () => {
    if (objWord.sound?.prs) {
      const prs = objWord.sound.prs[0].sound.audio;
      const sound = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${prs.charAt(
        0
      )}/${prs}.mp3`;
      new Audio(sound).play();
    }
  };

  const handleChangeTheme = () => {
    setCurrentTheme(currentTheme.theme === "dark" ? themes.light : themes.dark);
    localStorage.setItem(
      "theme",
      JSON.stringify(currentTheme.theme === "dark" ? "light" : "dark")
    );
  };

  function SetIconDarkMode(props) {
    if (props.mode.theme === "light") {
      return (
        <LightModeIcon sx={{ fontSize: 30, color: currentTheme.colorButton }} />
      );
    } else {
      return (
        <DarkModeIcon sx={{ fontSize: 30, color: currentTheme.colorButton }} />
      );
    }
  }

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));

    if (theme === "light" || theme === null) {
      setCurrentTheme(themes.light);
    } else {
      setCurrentTheme(themes.dark);
    }
    return () => {};
  }, [currentTheme.theme]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="app">
        <div className="bg-orange-300 font-roboto p-5 gap-3 mt-10 ml-auto mr-auto rounded-md w-96 flex justify-center items-center flex-col">
          <div className="flex w-full">
            <div className="basis-1/5"></div>
            <div className="basis-3/5 flex justify-center items-end">
              <h1 className="text-2xl">Dictionary</h1>
            </div>
            <div className="basis-1/5 flex justify-end">
              <IconButton onClick={() => handleChangeTheme()}>
                <SetIconDarkMode mode={currentTheme} />
              </IconButton>
            </div>
          </div>
          <SearchForm
            onChange={handleChangeText}
            onSubmit={handleSubmit}
            word={word}
          />
          <ErrorRes errorTrue={error} />
          <Result word={sechWord} objWord={objWord} onClick={handleSound} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);
