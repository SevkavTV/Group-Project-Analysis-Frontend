import axios from 'axios'

export const getAllTeams = async() => {
    const response = await axios.get('http://127.0.0.1:5000/api/get_all_teams')

    return response.data
}

export const getAvailableLeagues = async() => {
    const response = await axios.get('http://127.0.0.1:5000/api/get_available_leagues')

    return response.data
}

export const getTeamByLeagueId = async(leagueId) => {
    const response = await axios.post('http://127.0.0.1:5000/api/get_teams_by_league_id', {'league_id': leagueId})

    return response.data
}

export const getAnalysisInfo = async(teamId, criterion, start_date, end_date) => {
    const response = await axios.post('http://127.0.0.1:5000/api/analyze', { 'team_id': teamId, 'criterion': criterion, 'start_date': start_date, 'end_date': end_date})

    return response.data
}