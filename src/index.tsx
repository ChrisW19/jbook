import ReactDOM from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from './state';
/* import CodeCell from './components/code-cell'; */
import TextEditor from './components/text-editor';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el!);

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <TextEditor />
        {/*  <CodeCell /> */}

      </div>
    </Provider>
  );
};

root.render(<App />);