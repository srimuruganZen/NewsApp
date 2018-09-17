import { createStore, applyMiddleware,compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/sagas';
import reducer from "../reducer/reducer";
const sagaMiddleware = createSagaMiddleware()
 const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store;