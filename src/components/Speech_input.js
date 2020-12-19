import  React, { useState }  from "react";
import { useSpeechSynthesis,useSpeechRecognition } from 'react-speech-kit';

export default function Speech() {
  const [readText, setReadText] = useState('我是陳張元');
  const { speak } = useSpeechSynthesis({onEnd:()=>listen()});
  const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  return (
  <>
    <div>
      <textarea
        value={readText}
        onChange={(event) => setReadText(event.target.value)}
      />
      <button onClick={() => speak({ text: readText })}>Speak</button>
    </div>
    <div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onMouseDown={listen} onMouseUp={stop}>
        🎤
      </button>
      {listening && <div>Go ahead I'm listening</div>}
    </div>
  </>
  );
}
