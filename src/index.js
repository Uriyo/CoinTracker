
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );

