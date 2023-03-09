import { useSelector } from "react-redux";
import { useGetWordQuery } from "../store/dictionAPI";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

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

export function Result() {
  const { word } = useSelector((state) => state.diction);
  let res;
  const {
    isFetching,
    data = [],
    isError,
  } = useGetWordQuery(word, { skip: word < 1 });

  console.log(isFetching, "load");

  if (isFetching) {
    return <h2 className="text-4xl">Loading</h2>;
  }

  if (isError) {
    return <h2 className="text-4xl">Error</h2>;
  } else {
    res = data;
  }

  if (!isError && res?.length && typeof res[0] === "string") {
    return (
      <div className="p-2 border-0 dark:bg-neutral-700 rounded-md w-full flex flex-col gap-3 justify-center">
        <PrintArr p={"Maybe you mean"} arr={res} />
      </div>
    );
  }

  if (!isError && res?.length && !(typeof res[0] === "string")) {
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
