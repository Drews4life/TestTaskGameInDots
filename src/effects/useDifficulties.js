import { useState, useEffect } from 'react'
import axios from 'axios'

const useDifficulties = () => {
    const [difficulties, setDifficulties] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        (async() => { 
            try {
                const { data } = await axios.get('http://starnavi-frontend-test-task.herokuapp.com/game-settings')
                const difficulties = []

                Object.keys(data).forEach(key => {
                    difficulties.push({
                        type: key,
                        ...data[key]
                    })
                })

                setDifficulties(difficulties)
                setLoading(false)
            } catch(e) {
                console.log('unable to fetch user setting with err: ', e)
            }
        })()
    }, [])

    return [difficulties, isLoading]
}

export default useDifficulties