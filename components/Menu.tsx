import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { EditLink } from '.'
import Link from 'next/link'

export interface MenuProps {
  cms: any
  moveDown: string
  openToggle: () => void
  isOpen: boolean
}

const closeMenu = (closeFunction) => {
  setTimeout(closeFunction, 0)
}

export const Menu = ({cms, moveDown, openToggle, isOpen} : MenuProps) => {


  return (
    <>
    <MenuToggle open={isOpen} onClick={() => openToggle()} moveDown={moveDown}>
        <Compass open={isOpen}>
        {isOpen ? (<i className="fal fa-compass"></i>) : (<i className="fal fa-compass"></i>) }
        </Compass>
      </MenuToggle>
    <MenuContainer open={isOpen} moveDown={moveDown}> 
      
      

      <MenuContent>
      <Top>
        
          Navigation
        
      </Top>
        <Main>
          <ul>
            <li onClick={() => closeMenu(openToggle)}>
              <LinkItem>
                <Link href={"/"}>
                  Home
                </Link>
              </LinkItem>
              
            </li>
            
            <li onClick={() => closeMenu(openToggle)}>
              <LinkItem>
                <Link href="/posts/forge">
                  The Forge
                </Link>
              </LinkItem>
              
            </li>
          </ul>
          
          
        </Main>
        <Bottom>
          <EditLink cms={cms} />
        </Bottom>


      </MenuContent>
      

    </MenuContainer>
    </>
  )
}

const LinkItem = styled.div`
  & a {
    text-decoration: none;
    color: ${props => props.theme.background};

    transition: .1s;

    :hover {
      text-decoration: underline;
      color: ${props => props.theme.secondary};
    }
  }
`


const CloseButton = styled.div`
  margin: 1em 1em 0 0;
  font-size: 1.5em;
  font-family: Arial;
  font-weight: bold;

  color: ${props => props.theme.primary};

  :hover {
    
    box-shadow: 0 0 0 0;
    cursor: pointer;
    color: ${props => props.theme.background};
  }

  transition: 0.25s;
`

const Top = styled.div`
  width: 100%;
  flex: 1;

  font-family: ${props => props.theme.font.title.family};
  font-size: 2em;
  font-weight: ${props => props.theme.font.title.weight};

  color: ${props => props.theme.background};

  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuContent = styled.div`
  position: absolute;
  overflow: hidden;
  
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;


`

const Main = styled.div`
  width: 100%;
  


  

  border-top: 2px solid ${props => props.theme.background};
  border-bottom: 2px solid ${props => props.theme.background};

  font-family: ${props => props.theme.font.general.family};
  font-size: 1.2em;
  font-weight: ${props => props.theme.font.general.weight};

  color: ${props => props.theme.background};

  flex: 3;

  
`

const Bottom = styled.div`

  width: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-end;
  

`

const Compass = styled.div`
  

  transition-duration: .25s;
  
  

  opacity: ${props => props.open ? '0' : '1'};

  :hover {
    
    box-shadow: 0 0 0 0;
    cursor: pointer;
    color: ${props => props.open ? props.theme.background : props.theme.secondary};
  }
`

const MenuToggle = styled.div`
  color: ${props => props.theme.primary};
  

  transition-duration: .25s;

  
  top: ${props => props.moveDown};



  font-size: 2em;
`

const MenuContainer = styled.div`
  top: ${props => props.moveDown};
  position: fixed;


  max-width: 100vw;
  max-height: 90vh;

  border-bottom-right-radius: 25px;

  background-color: ${props => props.theme.primary};
  width: ${props => props.open ? '350px;' : '350px'};

  left: ${props => props.open ? '0' : '-350px'};

  transition-duration: .25s;
  
  height: 500px;

  

`