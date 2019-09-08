import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { 
    Dropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle,  
    Input,
    Button
} from 'reactstrap'
import { GameContext } from '../contexts/Game'

const InputsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

const InputGroupContainer = ({
    selectedDifficulty,
    selectDifficulty,
    startGame,
    buttonTitle,
    inGame
}) => {
    const { difficulties, username, onNameChange } = useContext(GameContext)
    const [showDropdown, toggleDropdown] = useState(false)

    const switchDropdown = () => toggleDropdown(val => !val)

    return (
        <InputsContainer>
            <Dropdown
                isOpen={showDropdown} 
                toggle={switchDropdown} 
            >
                <DropdownToggle caret>
                    {selectedDifficulty}
                </DropdownToggle>
                <DropdownMenu>
                    {difficulties.length > 0 && difficulties.map((difficulty, i) => (
                        <DropdownItem onClick={() => selectDifficulty(difficulty)} key={i}>
                            {difficulty.type}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            <Input className="padd" placeholder="Enter you name" disabled={inGame} value={username} onChange={onNameChange}/>
            <Button color="primary" onClick={startGame} disabled={username === "" || inGame} block>{buttonTitle}</Button>
        </InputsContainer>
    )
}

export default InputGroupContainer