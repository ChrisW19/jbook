import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState, useCallback } from 'react';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);

    if (window.innerWidth * 0.75 < width) {
      setWidth(window.innerWidth * 0.75);
    }
  }, [width]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        handleResize();
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [handleResize]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: Math.min(300, innerHeight * 0.97), // Cap the height at 300 or 97% of the viewport
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.97],
      minConstraints: [Infinity, 24], // Minimum height set to 24px
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;