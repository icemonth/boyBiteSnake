import { createStore, compose, applyMiddleware } from 'redux'
import { reducers } from './reducers'
const middleWare = function({getState,dispatch}){
    console.log('arg====',arguments[0])
    return function(){}
}
const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)
const store = createStore(reducers,applyMiddleware(thunk))
export {
    store
}

function run(gen){
    var iter = gen()
    function next(value){
        const result = iter.next(value)
        if(!result.done){
            result.value.then(res=>next(res))
        }
    }
}