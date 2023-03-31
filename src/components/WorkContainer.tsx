import { forwardRef, useImperativeHandle, useState, useRef} from 'react'
import { readChar } from '../shared/utils'
// @ts-ignore
// eslint-disable-next-line
import work from '!!raw-loader!../styles/work.css';

const WorkContainer = forwardRef((props, ref) => {
  const container = useRef<HTMLPreElement>(null)
  const [ content, setContent ] = useState<string>('')
  const update = (char: string) => {
    setContent(oldContent => oldContent + char )
    if(container.current) {
      container.current.scrollTop = container.current.scrollHeight
    }
  }
  useImperativeHandle(ref, () => ({
    write: async (stepIndex: number) => {
      await readChar(work, 0, 1, update)
    }
  }))
  return (
    <pre 
      ref={container}
      id="work-container" 
      dangerouslySetInnerHTML={{ __html: content }}
    >
    </pre>
  )
})

export default WorkContainer
