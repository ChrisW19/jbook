import { useEffect, useRef } from 'react';
import "./preview.css";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          throw err;
      };
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
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
        sandbox="allow-scripts "
        srcDoc={html}
        className="iframe-preview"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;