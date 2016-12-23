import angular from 'angular';
import { static as Immutable } from 'seamless-immutable';
import ngRedux from 'ng-redux';
import createLogger from 'redux-logger';

import RootReducer from './reducer.js';

StoreConfig.$inject = ['$ngReduxProvider', 'rootReducerProvider'];
function StoreConfig($ngReduxProvider, rootReducerProvider) {
    let rootReducer = rootReducerProvider.createReducer();
    let middlewares = [
        createLogger({ level: 'info', collapsed: true })
    ];

    $ngReduxProvider.createStoreWith(rootReducer, middlewares);
}

$ngReduxImmutableDecorator.$inject = ['$delegate'];
function $ngReduxImmutableDecorator($delegate) {
    $delegate.getStateUnsafe = $delegate.getState;
    $delegate.subscribeAll = $delegate.subscribe;

    $delegate.getState = (stateFn) => {
        if (stateFn) {
            return Immutable.asMutable(stateFn($delegate.getStateUnsafe()), { deep: true });
        } else {
            return Immutable.asMutable($delegate.getStateUnsafe(), { deep: true });
        }
    };

    $delegate.subscribe = (stateFn, cb) => {
        cb = cb || stateFn;
        if (cb === stateFn) {
            return $delegate.subscribeAll(cb);
        }

        let previousValue = stateFn($delegate.getStateUnsafe());
        return $delegate.subscribeAll(() => {
            let currentValue = stateFn($delegate.getStateUnsafe());
            if (currentValue !== previousValue) {
                previousValue = stateFn($delegate.getStateUnsafe());
                cb(Immutable.asMutable(currentValue, { deep: true }));
            }
        });
    };

    return $delegate;
}

export { $ngReduxImmutableDecorator, StoreConfig };
/**
 * @namespace app/store
 * @desc Configures the frontend singleton store with its
 * reducers and middlewares.
 */
export default angular.module('app.store', [ngRedux, RootReducer])
    .config(StoreConfig)
    .decorator('$ngRedux', $ngReduxImmutableDecorator)
    .name;
