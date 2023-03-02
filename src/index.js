import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from "@mui/material/styles";

function SearchForm(props) {
  return (
    <form
      className="flex justify-between items-center gap-3 w-full p-2 rounded-md border-0 dark:bg-neutral-700"
      onSubmit={(e) => props.onSubmit(e)}
    >
      <TextField
        id="outlined-basic"
        onChange={(e) => props.onChange(e)}
        value={props.word}
        label="Word"
        variant="outlined"
        size="small"
        fullWidth={true}
      />
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
  if (props.word.length) {
    const res = props.objWord.lexicalEntries;
    return (
      <div className="p-2 border-0 dark:bg-neutral-700 rounded-md w-full flex flex-col gap-3 justify-center">
        <div className="flex dark:border-white justify-between items-center gap-3 w-full rounded-md border-2 border-stone-900">
          <div className="text-2xl ml-3">{props.word}</div>
          <div className="res-sound">
            <IconButton aria-label="volumeUp" onClick={() => props.onClick()}>
              <VolumeUpIcon sx={{ fontSize: 30 }} />
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

  const [word, setWord] = useState("");
  const [sechWord, setSechWord] = useState("");
  const [error, setError] = useState(false);
  const [objWord, setObjWord] = useState({
    sound: [],
    lexicalEntries: {},
  });
  const { mode, setMode } = useColorScheme();

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
    setMode(mode === "dark" ? "light" : "dark");

    localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
  };

  function SetIconDarkMode(props) {
    if (props.mode === "light") {
      return <LightModeIcon sx={{ fontSize: 30 }} />;
    } else {
      return <DarkModeIcon sx={{ fontSize: 30 }} />;
    }
  }

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
    return () => {};
  }, [mode, setMode]);

  return (
    <div className="app">
      <div
        className="bg-violet-200 dark:bg-slate-900 dark:text-white font-roboto p-5 gap-3
       mt-10 ml-auto mr-auto rounded-md w-auto md:w-760 flex justify-center items-center flex-col"
      >
        <div className="flex w-full">
          <div className="basis-1/5"></div>
          <div className="basis-3/5 flex justify-center items-end">
            <h1 className="text-2xl">Dictionary</h1>
          </div>
          <div className="basis-1/5 flex justify-end">
            <IconButton onClick={() => handleChangeTheme()}>
              <SetIconDarkMode mode={mode} />
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
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CssVarsProvider>
    <Body />
  </CssVarsProvider>
);
