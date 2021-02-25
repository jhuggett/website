import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {Canvas} from '../components/Canvas/Canvas'
import { canvasContext } from '../game'

export default function Backdoor({file, cms, themeHandler, hideTopBar}) {


  const [showGame, setShowGame] = useState(false)


  return showGame ? (
  <Background>
    <Canvas context={canvasContext} />
  </Background>
  ) : (
    <Background>
      <Question>
        Shall we play a game?
      </Question>
      <Answer onClick={() => setShowGame(true)}>
        Yes
      </Answer>
      
      <Answer onClick={() => {window.location.href = '/'}}>
        No
      </Answer>
      
    </Background>
  )
}



const Background = styled.div`
  width: 100vw;
  height: 100vh;

  background: black;

  flex-flow: column;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Question = styled.div`
  font-family: 'DOS';
  font-size: 2em;
  color: green;

  margin-bottom: 1em;

`

const Answer = styled.div`
  font-family: 'DOS';
  font-size: 1.5em;
  color: green;


  margin: 0 0 .5em 0;
  padding: .25em .5em .25em .5em;

  border: 2px solid black;

  :hover {
    border: 2px solid green;
    cursor: pointer;
  }
`