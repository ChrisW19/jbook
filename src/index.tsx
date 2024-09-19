import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);

const App = () => {
    const ref = useRef<esbuild.Service | null>()

    const [input, setInput] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        const result = await ref.current.transform(input, {
            loader: 'jsx',
            target: 'es2015',
        });

        setCode(result.code);
    
    };

    return (
        <div>
            <textarea value={input} onChange={e => setInput(e.target.value)} />
            <div>
                <button className="btn btn-primary" onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

root.render(<App />);