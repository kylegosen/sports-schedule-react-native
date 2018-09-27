import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import Navigator from './src/navigators/Navigator';
import rootReducer from './src/reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <Navigator/>
      </Provider>
    );
  }
}