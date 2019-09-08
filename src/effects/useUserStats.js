import { useState, useEffect } from 'react'
import axios from 'axios'

const useUserStats = () => {
    const [userStats, setUserStats] = useState([])

    useEffect(() => {
        (async() => { 
            try {
                const { data } = await axios.get('http://starnavi-frontend-test-task.herokuapp.com/winners')
                setUserStats(data)
            } catch(e) {
                console.log('unable to fetch user stats with err: ', e)
            }
        })()
    }, [])

    return [userStats, setUserStats]
}

export default useUserStats