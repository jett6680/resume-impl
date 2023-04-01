import React, { useRef, useEffect } from 'react';
import StyleContainer from "./components/StyleContainer";
import WorkContainer from "./components/WorkContainer";

interface StyleRef {
  write: (stepIndex: number) => void 
}

interface WorkRef extends StyleRef {
  preview: () => void
}

function App() {
  const styleRef = useRef<StyleRef>()
  const workRef = useRef<WorkRef>()

  const start = async () => {
    await styleRef.current?.write(0)
    await workRef.current?.write(0)
    await workRef.current?.preview()
    await styleRef.current?.write(1)
    await styleRef.current?.write(2)
  }

  useEffect(() => {
    start()
  }, [])
  return (
    <>
      <WorkContainer ref={workRef}/>
      <StyleContainer ref={styleRef} />
    </>
  );
}

export default App;
