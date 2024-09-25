import { useState, useEffect, useCallback, useRef } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const timerRef = useRef<number | null>(null);

  const handleBundling = useCallback(async (input: string) => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.err); // Reset error on success
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = window.setTimeout(() => {
      handleBundling(input);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [input, handleBundling]);


  // Memoize the onChange function to avoid unnecessary re-renders
  const handleEditorChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={handleEditorChange}
          />
        </Resizable>

          <Preview code={code} error={error}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;

