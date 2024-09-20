import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';

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

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
            define: {
                'process.env.env.NODE_ENV': '"production"',
                global: 'window'
            }
        })

        //console.log(result);

        setCode(result.outputFiles[0].text);
    
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