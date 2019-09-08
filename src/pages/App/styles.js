import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: ${({fields}) => `repeat(${fields}, 2.2rem);`}
  grid-auto-rows: ${({fields}) => `repeat(${fields}, 1fr);`}
`

export const GridItem = styled.div`
  border: 1px solid #EEEEF0;
  padding: 1rem;
  background-color: ${({color}) => color}
`

export const PlayBox = styled.div`
  border: 1px solid #EEEEF0;
  width: 40%;
  height: 80%;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`