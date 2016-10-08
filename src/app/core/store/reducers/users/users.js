import actions from 'app/core/store/actions/users/users';

export function usersReducer(state = {
    list: []
}, action) {

    switch(action.type) {

        // Get all users
        case actions.REQUEST_USERS:
            return state;
        case actions.RESOLVE_USERS:
            return Object.assign({}, state, {
                list: action.users
            });
        case actions.REJECT_USERS:
            return state;

        // Get a specific user
        case actions.REQUEST_USER:
            return state;
        case actions.RESOLVE_USER:
            return Object.assign({}, state, {
                list: state.list.map((user) => {
                    if (user.id !== action.user.id) {
                        return user;
                    } else {
                        return Object.assign({}, user, action.user);
                    }
                })
            });
        case actions.REJECT_USER:
            return state;

        // Add a new user
        case actions.REQUEST_ADD_USER:
            return state;
        case actions.RESOLVE_ADD_USER:
            return Object.assign({}, state, {
                list: [...state.list, action.user]
            });
        case actions.REJECT_ADD_USER:
            return state;


        // Update a user
        case actions.REQUEST_UPDATE_USER:
            return state;
        case actions.RESOLVE_UPDATE_USER:
            return Object.assign({}, state, {
                list: state.list.map((user) => {
                    if (user.id !== action.user.id) {
                        return user;
                    } else {
                        return Object.assign({}, user, action.user);
                    }
                })
            });
        case actions.REJECT_UPDATE_USER:
            return state;


        // Delete a user
        case actions.REQUEST_DELETE_USER:
            return state;
        case actions.RESOLVE_DELETE_USER:
            return Object.assign({}, state, {
                list: state.list.filter((user) => {
                    if (user.id !== action.user.id) {
                        return true;
                    } else {
                        return false;
                    }
                })
            });
        case actions.REJECT_DELETE_USER:
            return state;

        // If no actions match
        default:
            return state;
    }
}