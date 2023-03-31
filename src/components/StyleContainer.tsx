import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { handleChar, readChar } from '../shared/utils'
// @ts-ignore
// eslint-disable-next-line
import style0 from '!!raw-loader!../styles/style0.css';
// @ts-ignore
// eslint-disable-next-line
import style1 from '!!raw-loader!../styles/style1.css';
// @ts-ignore
// eslint-disable-next-line
import style2 from '!!raw-loader!../styles/style2.css';

const styleText = [ style0, style1, style2 ]

const styleTagElement = document.getElementById('style-tag') as HTMLStyleElement

const StyleContainer = forwardRef((props, ref) => {
  const container = useRef<HTMLPreElement>(null)
  const styleBuffer = useRef<string>('')
  const [content, setContent] = useState<string>('')
  const update = (char: string) => {
    setContent(oldContent => handleChar(oldContent, char))
    styleBuffer.current += char
    if (char === ';') {
      styleTagElement.textContent += styleBuffer.current
      styleBuffer.current = ''
    }
    if(container.current) {
      container.current.scrollTop = container.current.scrollHeight
    }
  }

  useImperativeHandle(ref, () => ({
    write: async (stepIndex: number) => {
      await readChar(styleText[stepIndex], 0, 1, update)
    }
  }))

  return (
    <pre ref={container} id="style-container" dangerouslySetInnerHTML={{ __html: content }} ></pre>
  )
})

export default StyleContainer
