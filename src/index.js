import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store/store";
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

import { handleChangeText,  getRes } from "./store/slice";

function SearchForm() {
  const word = useSelector((state) => state.diction.word);
  const dispatch = useDispatch();

  return (
    <form
      className="flex justify-between items-center gap-3 w-full p-2 rounded-md border-0 dark:bg-neutral-700"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(getRes(word));
      }}
    >
      <TextField
        id="outlined-basic"
        onChange={(e) => dispatch(handleChangeText(e.target.value))}
        value={word}
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
    const keys = Object.keys(props.arr[0]);
    return (
      <div>
        <p>{props.p}</p>
        <ul className="ml-3">
          {props.arr.map((el, i) => (
            <li key={i}> {el[keys[props.keyNum]]} </li>
          ))}
        </ul>
      </div>
    );
  }
}

function Result() {
  const { error, status, res } = useSelector((state) => state.diction);

  if (status === "loading") {
    return <h2 className="text-4xl">Loading</h2>;
  }

  if (error) {
    return <h2 className="text-4xl">{error}</h2>;
  }

  if (!error && res?.length && typeof res[0] === "string") {
    return (
      <div className="p-2 border-0 dark:bg-neutral-700 rounded-md w-full flex flex-col gap-3 justify-center">
        <PrintArr p={"Maybe you mean"} arr={res} />
      </div>
    );
  }

  if (!error && res?.length && !(typeof res[0] === "string")) {
    const res0 = res[0];
    const handleSound = () => {
      if (res0.hwi?.prs) {
        const prs = res0.hwi.prs[0].sound.audio;
        const sound = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${prs.charAt(
          0
        )}/${prs}.mp3`;
        new Audio(sound).play();
      }
    };
    return (
      <div className="p-2 border-0 dark:bg-neutral-700 rounded-md w-full flex flex-col gap-3 justify-center">
        <div className="flex dark:border-white justify-between items-center gap-3 w-full rounded-md border-2 border-stone-900">
          <div className="text-2xl ml-3">{res0.hwi?.hw}</div>
          <div className="res-sound">
            <IconButton aria-label="volumeUp" onClick={() => handleSound()}>
              <VolumeUpIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </div>
        </div>
        <div className="res-list">
          <div>
            <p>{res0?.fl}</p>
          </div>
          {}
          <div>
            <p>{res0.hwi?.prs !== undefined ? res0.hwi.prs[0].mw : null}</p>
          </div>
          <PrintArr p={"Definitions"} arr={res0.shortdef} />
          <PrintArrObj p={"Phrasal verb"} keyNum={0} arr={res0.dros} />
        </div>
      </div>
    );
  }
}

function Body() {
  const { mode, setMode } = useColorScheme();

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
        <SearchForm />
        <Result />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CssVarsProvider>
    <Provider store={store}>
      <Body />
    </Provider>
  </CssVarsProvider>
);
