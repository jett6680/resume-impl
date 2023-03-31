import React, { useRef, useEffect } from 'react';
import StyleContainer from "./components/StyleContainer";
import WorkContainer from "./components/WorkContainer";

interface WriteRef {
  write: (stepIndex: number) => void 
}

function App() {
  const styleRef = useRef<WriteRef>()
  const workRef = useRef<WriteRef>()

  const start = async () => {
    await styleRef.current?.write(0)
    await workRef.current?.write(0)
    await styleRef.current?.write(1)
    await styleRef.current?.write(2)
  }

  useEffect(() => {
    start()
  }, [])
  return (
    <div className="App">
      <WorkContainer ref={workRef}/>
      <StyleContainer ref={styleRef} />
    </div>
  );
}

export default App;
