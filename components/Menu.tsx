import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { EditLink } from '.'
import Link from './Link'
import paths from '../paths'
import { SwapTheme } from './SwapTheme'
import { ThemeHandler } from '../pages/_app'

export interface MenuProps {
  cms: any
  moveDown: string
  openToggle: () => void
  isOpen: boolean
  themeHandler: ThemeHandler
}

const closeMenu = (closeFunction) => {
  setTimeout(closeFunction, 0)
}

export const Menu = ({cms, moveDown, openToggle, isOpen, themeHandler} : MenuProps) => {


  return (
    <>
    <MenuToggle open={isOpen} moveDown={moveDown}>
        <Compass open={isOpen} onClick={() => openToggle()}>
        {isOpen ? (<i className="fas fa-compass"></i>) : (<i className="fas fa-compass"></i>) }
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
                <Link to={paths.home} prefetch={true}>
                  Home
                </Link>
              </LinkItem>
              
            </li>
            
            <li onClick={() => {closeMenu(openToggle)}}>
              <LinkItem>
                <Link to={paths.posts({ name: 'forge' })} prefetch={true}>
                  The Forge
                </Link>
              </LinkItem>
              
            </li>
            <li onClick={() => {closeMenu(openToggle)}}>
              <LinkItem>
                <Link to={paths.posts({ name: 'knife' })} prefetch={true}>
                  The Knife
                </Link>
              </LinkItem>
              
            </li>
            <li onClick={() => {closeMenu(openToggle)}}>
              <LinkItem>
                <Link to={paths.posts({ name: 'pomelo-sweetmeat' })} prefetch={true}>
                  Pomelo Sweetmeat
                </Link>
              </LinkItem>
              
            </li>
          </ul>
          
          
        </Main>
        <Bottom>
          <EditLink cms={cms} />
          <SwapTheme themeHandler={themeHandler} moveDown={moveDown} />
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

  padding: 1em 0 1em 0;
  

`

const Compass = styled.div`
  position: absolute;

  margin: 1em 0 0 1em;

  transition-duration: .25s;
  
  color: ${props => props.theme.primary};

  border-radius: 50%;
  line-height: 0;
  opacity: ${props => props.open ? '0' : '1'};



  font-size: 1.5em;

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

  z-index: 99999999;


  max-width: 100vw;
  max-height: 90vh;

  border-bottom-right-radius: 25px;

  background-color: ${props => props.theme.primary};
  width: ${props => props.open ? '350px;' : '350px'};

  left: ${props => props.open ? '0' : '-350px'};

  transition-duration: .25s;
  
  height: 500px;

  

`