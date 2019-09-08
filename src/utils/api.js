import axios from 'axios'
import { formatDate } from './index'

export const postWinnerData = username => {
    return axios.post('http://starnavi-frontend-test-task.herokuapp.com/winners', {
        winner: username,
        date: formatDate()
    })
}