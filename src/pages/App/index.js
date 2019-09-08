import React, { Component } from 'react';
import { 
    Container, 
    Grid, 
    GridItem,
    PlayBox
} from './styles'
import { 
    getRand, 
    objectSize, 
    defineColorForItem 
} from '../../utils'
import { WithGameContext } from '../../contexts/Game'

import InputGroupContainer from '../../layout/InputsContainer'
import Leaderboards from '../../layout/Leaderboards'

import uuid from 'uuid/v4'

class App extends Component {

  state = {
    popupMsg: '',
    active: {
      row: null,
      column: null,
    },
    failed: {},
    won: {},
    selectedDifficulty: "Pick game mode",
    delay: null,
    currentSecondsDelay: null,
    fields: null,
    extractedDelay: 0,
    attempts: 0,
    inGame: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { difficulties } = nextProps
    if (prevState.delay === null && difficulties.length > 0) {
      const delay = (difficulties[0].delay % 60000) / 1000
      return {
        delay: delay,
        currentSecondsDelay: delay,
        fields: difficulties[0].field,
        selectedDifficulty: difficulties[0].type,
        extractedDelay: delay === .9 ? .1 : 0
      }
    }

    return {}
  }

  startGame = () => {
    this.clearTheGame()

    const newGridItem = this.pickRandomItem()
    this.setState({active: newGridItem, inGame: true}, this.restartCountDown)
  }

  restartCountDown = () => {
    if(this.intervalHandle !== undefined) {
      clearInterval(this.intervalHandle)
    }

    this.setState(prevState => ({
      ...prevState,
      currentSecondsDelay: prevState.delay
    }), () => {
      const diff = this.state.extractedDelay === .1 ? 900 : 1000
      this.intervalHandle = setInterval(this.tick, diff);
    })
  }

  tick = () => this.setState(prevState => ({
    ...prevState,
    currentSecondsDelay: prevState.currentSecondsDelay - (this.state.extractedDelay || 1)
  }), () => {
    if (this.state.currentSecondsDelay <= 0) {
      clearInterval(this.intervalHandle);
      this.changeItemStatus(this.state.active.column, this.state.active.row, false)
    }
  })

  selectGridItem = (column, row) => { 
    const { currentSecondsDelay, active } = this.state
    const isWinningItem = active.row === row && active.column === column

    if(currentSecondsDelay > 0 && isWinningItem) {
      this.changeItemStatus(column, row, true)
    }
  }

  changeItemStatus = (column, row, hasWon) => {
    const key = hasWon ? "won" : "failed"
    this.setState(prevState => ({
        ...prevState,
        [key]: {
            ...prevState[key],
            [`${column}${row}`]: true
        }
    }), this.burstNewItem)
  }

  burstNewItem = () => {
    const { failed, won, fields, inGame } = this.state
    const winPoint = Math.floor( (fields ** 2) / 2 )
    const hasFailed = Math.floor(objectSize(failed)) > winPoint
    const hasWon = Math.floor(objectSize(won)) > winPoint

    if(hasFailed || hasWon) {
      if(inGame) {
        return this.finishGame(hasWon)
      }
        
      return 
    }

    const newItem = this.pickRandomItem()

    this.setState(prevState => ({
      ...prevState,
      active: newItem
    }), () => {
      this.restartCountDown()
    })
  }

  finishGame = hasWon => {
    const winnerUsername = hasWon ? this.props.username : "Computer AI"
    const msg = hasWon ? `${winnerUsername} won!` : `${winnerUsername} won!`
    
    this.setState(
        prevState => ({...prevState, attempts: prevState.attempts + 1, inGame: false, popupMsg: msg }), 
        () => this.props.postStats(winnerUsername)
    )
  }

  populateGrid = () => {
    const {
      active,
      failed,
      won,
      fields
    } = this.state

    const rows = Array(fields).fill(0)
    const columns = Array(fields).fill(0)

    return columns.map((_, i) => rows.map((_, j) => {
      const isActive = active.row === j && active.column === i
      const isFailed = failed.hasOwnProperty(`${i}${j}`)
      const isWon = won.hasOwnProperty(`${i}${j}`)

      const color = defineColorForItem(isWon, isFailed, isActive)
      
      return (
        <GridItem 
          key={uuid()} 
          color={color} 
          onClick={() => this.selectGridItem(i, j)}
        />
      )
    }))
  }


  pickRandomItem = () => {
    const { failed, won } = this.state
    let randomItem = this.pickRandomItemHelper()
    let key = `${randomItem.column}${randomItem.row}`
    
    while(failed.hasOwnProperty(key) || won.hasOwnProperty(key)) {
      randomItem = this.pickRandomItemHelper()
      key = `${randomItem.column}${randomItem.row}`
    }

    return randomItem
  }

  pickRandomItemHelper = () => {
    const column = getRand(0, this.state.fields - 1)
    const row = getRand(0, this.state.fields - 1)

    return {column, row}
  }
  

  clearTheGame = () => this.setState(prevState => ({
    ...prevState,
    currentSecondsDelay: prevState.delay,
    won: {},
    failed: {},
    active: {
        column: null,
        row: null
    },
    inGame: false,
    popupMsg: "",
    attempts: 0
  }), () => {
      if(this.intervalHandle !== undefined) {
          clearInterval(this.intervalHandle)
      }
  })

  selectDifficulty = difficulty => {
    const delay = (difficulty.delay % 60000) / 1000

    this.setState({
        selectedDifficulty: difficulty.type,
        delay: delay,
        currentSecondsDelay: delay,
        fields: difficulty.field
    }, this.clearTheGame)
  }

  render() {
    const {
        selectedDifficulty,
        attempts,
        inGame,
        popupMsg
    } = this.state

    return (
      <Container>
        <PlayBox>
          <InputGroupContainer 
              selectedDifficulty={selectedDifficulty}
              selectDifficulty={this.selectDifficulty} 
              startGame={this.startGame}
              inGame={inGame}
              buttonTitle={attempts > 0 ? "Play again" : "Play"}
          />
          <p className="lead" style={{alignSelf: "center"}}>{popupMsg}</p>
          <Grid fields={this.state.fields}>
            {this.populateGrid()}
          </Grid>
        </PlayBox>

        <PlayBox >
          <Leaderboards/>
        </PlayBox>
      </Container>
    );
  }
}


export default WithGameContext(App)
