import React from 'react'
import { GameContext } from './Provider'

export const WithGameContext = Component => {
    return props => {
        return (
            <GameContext.Consumer>
                {context => <Component {...context} {...props}/> }
            </GameContext.Consumer>
        );
    }
} 