import { useState, useEffect, useRef } from 'react';
import MDEditorfrom from "@uiw/react-md-editor";
import MDEditor from '@uiw/react-md-editor';
import "./text-editor.css";

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState('# Header');

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && 
                event.target && 
                ref.current.contains(event.target as Node)
            ) {
                return;
            }

            setEditing(false)
        };
        
        document.addEventListener('click', listener, {capture:true});

        return () => {
            document.removeEventListener('click', listener, {capture: false});
        };

    }, []);

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor value={value} onChange={(v) => setValue(v || '')}/>
            </div>
        )
    }

    return (
        <div className="text-editor" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditorfrom.Markdown source={value} />
            </div>
        </div>
    )
};

export default TextEditor;