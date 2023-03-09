import { useActions } from "../hooks/actions";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function SearchForm() {
  const [wordSet, setWordSet] = useState("");
  const { handleChangeText } = useActions();

  return (
    <form
      className="flex justify-between items-center gap-3 w-full p-2 rounded-md border-0 dark:bg-neutral-700"
      onSubmit={(e) => {
        e.preventDefault();
        handleChangeText(wordSet);
      }}
    >
      <TextField
        id="outlined-basic"
        onChange={(e) => setWordSet(e.target.value)}
        value={wordSet}
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
