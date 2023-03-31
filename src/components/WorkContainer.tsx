import { forwardRef, useImperativeHandle, useState} from 'react'
import { readChar } from '../shared/utils'
// @ts-ignore
// eslint-disable-next-line
import work from '!!raw-loader!../styles/work.css';

const WorkContainer = forwardRef((props, ref) => {
  const [ content, setContent ] = useState<string>('')
  const update = (char: string) => {
    setContent(oldContent => char + oldContent)
  }
  useImperativeHandle(ref, () => ({
    write: async (stepIndex: number) => {
      await readChar(work, 0, 1, update)
    }
  }))

  return (
    <div id="work-container" className='flipped' dangerouslySetInnerHTML={{ __html: content }}></div>
  )
})

export default WorkContainer
