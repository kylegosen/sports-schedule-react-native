import * as types from '../constants/action-types';

const API = "http://sportsschedule.kylegosen.com/api";

export function getTeams() {
    return async (dispatch/* getState*/) => {
        dispatch({type: types.GET_TEAMS_REQUEST});
        try {
            let data = await fetch(`${API}/teams`);
            let json = await data.json();

            let teams = json._embedded.teams;

            let sortedTeams = teams.sort((a,b) => {
                let aCity = a.city;
                let bCity = b.city;
                if(aCity > bCity) return 1; 
                if (aCity < bCity) return -1;

                let aName = a.name;
                let bName = b.name;
                return aName > bName ? 1 : aName < bName ? -1 : 0;
            });
            dispatch({type: types.GET_TEAMS_SUCCESS, teams: sortedTeams});
        } catch (e){
            dispatch({type: types.GET_TEAMS_FAILURE, error: e});
        }
    }
}