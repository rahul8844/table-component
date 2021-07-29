import { createStore } from 'redux';
import { RootReducers } from './Reducers';

export const store = createStore(RootReducers);