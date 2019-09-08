import React, { useContext } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { GameContext } from '../contexts/Game'

const Leaderboards = () => {
    const { userScores } = useContext(GameContext)

    return (
        <div styles="display: flex;">
            <h3>Leader Board</h3>

            {userScores.length > 0 && userScores
            .slice(Math.max(userScores.length - 5, 1))
            .reverse()
            .map((score, i) => (
                <Breadcrumb key={i}>
                    <BreadcrumbItem >{score.winner}</BreadcrumbItem>
                    <BreadcrumbItem >{score.date}</BreadcrumbItem>
                </Breadcrumb>
            ))}
        </div>
    )
}

export default Leaderboards