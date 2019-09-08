import React, { useState, useEffect } from 'react'

import { Spinner } from 'reactstrap'
import styled from 'styled-components'

import { postWinnerData } from '../../utils/api'

import useDifficulties from '../../effects/useDifficulties'
import useUserStats from '../../effects/useUserStats'
import useAction from '../../effects/useAction'

const GameContext = React.createContext()

const LoadingScreen = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`

const GameProvider = ({children}) => {
    const [username, setName] = useState("")
    const [difficulties, isLoading] = useDifficulties()
    const [userScores, setUserScores] = useUserStats()
    const [postWinnerStatus, performPostWinner] = useAction(postWinnerData)

    useEffect(() => {
        if(postWinnerStatus.type === "success") {
            if(Array.isArray(postWinnerStatus.result.data)) {
                setUserScores(postWinnerStatus.result.data)
            }
        } else if(postWinnerStatus.type === "failure") {
            console.log("Failed to post data")
        }
    }, [postWinnerStatus])

    const onNameChange = e => setName(e.target.value)

    return (
        <GameContext.Provider
            value={{
                username,
                difficulties,
                userScores,
                onNameChange,
                postStats: performPostWinner,
            }}
        >
            {
                isLoading ? (
                    <LoadingScreen>
                        <Spinner color="primary" />
                    </LoadingScreen>
                ) : children
            }
        </GameContext.Provider>
    )
}

export { GameProvider as Provider, GameContext }