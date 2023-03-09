import React, { useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import {SearchForm} from "./SearchForm";
import {Result} from "./Result"
import { useColorScheme } from "@mui/material/styles";

export function Dictionary() {
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
