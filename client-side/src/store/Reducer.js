export const appState = {
    loggedIn: false,
    loading: false,
};

export const appReducer = (state, action) => {

    switch (action.type) {
        case "login":
            return {
                ...state,
                loggedIn: true
            } 
        case "loading":
            return {
                ...state,
                loading: action.payload
            }
   
        case "signout":
            return {
                ...state,
                loggedIn: false
            }
        default:
            return {
                ...state
            }    
        }
};