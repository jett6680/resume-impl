import { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import Markdown from 'markdown'
import { scheduler } from '../shared/utils'
// @ts-ignore
// eslint-disable-next-line
import work from '!!raw-loader!../styles/work.css';
const mdContent = Markdown.parse(work)

const WorkContainer = forwardRef((props, ref) => {
  const container = useRef<HTMLPreElement>(null)
  const [content, setContent] = useState<string>('')
  const [showContaier, setShowContaier] = useState<boolean>(false)
  const [isFinish, setIsFinish] = useState<boolean>(false)

  const update = (char: string) => {
    setContent(oldContent => oldContent + char)
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight
    }
  }
  useImperativeHandle(ref, () => ({
    write: async (stepIndex: number) => {
      setShowContaier(true)
      await scheduler.readChar(work, 0, 1, update)
    },
    preview: () => {
      setIsFinish(true)
    }
  }))
  if (!showContaier) {
    return <></>
  }
  return (
    <div id='work-wrap'>
      <pre
        style={{
          display: isFinish ? 'block' : 'none',
        }}
        className="text"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <pre
        style={{ display: isFinish ? 'block' : 'none' }}
        className="md"
        dangerouslySetInnerHTML={{ __html: mdContent }}
      />
      <pre
        style={{ display: isFinish ? 'none' : 'block' }}
        id="work-container"
        ref={container}
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </pre>
    </div>
  )
})

export default WorkContainer
