import * as types from '../constants/action-types';

const initialState = {
    teams: [],
    isTeamsLoading: false,
    teamsError: null,
    favoriteTeams: []
}

export default rootReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_TEAMS_REQUEST:
            return {...state, isTeamsLoading: true};
        case types.GET_TEAMS_SUCCESS:
            return {...state, teams: action.teams, isTeamsLoading: false};
        case types.GET_TEAMS_FAILURE:
            return {...state, teamsError: action.error, isTeamsLoading: false};
        default:
            return state;
    }
}