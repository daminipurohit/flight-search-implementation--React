import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const createDevtoolsExtension = () => {
    if (process.env.NODE_ENV === 'production' || !window.__REDUX_DEVTOOLS_EXTENSION__) {
        return f => f;
    }

    return window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: true });
};

const devToolsExtension = createDevtoolsExtension();

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    devToolsExtension
));

export default store;
