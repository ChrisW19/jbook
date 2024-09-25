import { useEffect, useRef } from 'react';
import "./preview.css";

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div class="error-message"><h4>Runtime Error</h4>' + err + '</div>';
          throw err;
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const currentIframe = iframe.current;
    if (currentIframe) {
      currentIframe.srcdoc = html;
      const timeoutId = setTimeout(() => {
        currentIframe.contentWindow?.postMessage(code, '*');
      }, 50);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timeoutId);
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts allow-same-origin"
        srcDoc={html}
        className="iframe-preview"
      />
    </div>
  );
};

export default Preview;