import { useGetWordQuery } from "../store/dictionAPI";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAppSelector } from "../hooks/redux";

export default function Result() {
  const { word } = useAppSelector((state) => state.diction);
  const { isFetching, data, isError } = useGetWordQuery(word, {
    skip: word.length < 1,
  });
  console.log(data);
  if (isFetching) {
    return <h2 className="text-4xl">Loading</h2>;
  }

  if (isError) {
    return <h2 className="text-4xl">Error</h2>;
  }

  if (!isError && data?.length && !(typeof data[0] === "string")) {
    const handleSound = () => {
      if (data[0]?.hwi?.prs) {
        const prs = data[0].hwi.prs[0].sound.audio;
        const sound = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${prs.charAt(
          0
        )}/${prs}.mp3`;
        new Audio(sound).play();
      }
    };
    return (
      <div className="p-2 border-0 dark:bg-neutral-700 rounded-md w-full flex flex-col gap-3 justify-center">
        <div className="flex dark:border-white justify-between items-center gap-3 w-full rounded-md border-2 border-stone-900">
          <div className="text-2xl ml-3">{data[0].hwi?.hw}</div>
          <div className="res-sound">
            <IconButton aria-label="volumeUp" onClick={() => handleSound()}>
              <VolumeUpIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </div>
        </div>
        <div className="res-list">
          <div>
            <p>{data[0]?.fl}</p>
          </div>
          <div>
            <p>{data[0].hwi?.prs && data[0].hwi.prs[0].mw}</p>
          </div>
          {data[0]?.dros?.length && (
            <div>
              <p>Definitions</p>
              <ul className="ml-3">
                {data[0].shortdef.map((el, i) => (
                  <li key={i}> {el} </li>
                ))}
              </ul>
            </div>
          )}
          {data[0]?.dros?.length && (
            <div>
              <p>Phrasal verb</p>
              <ul className="ml-3">
                {data[0].dros.map((el, i) => (
                  <li key={i}> {el.drp} </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
