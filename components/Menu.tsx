import styled from 'styled-components'
import { useState } from 'react'

export interface MenuProps {

}

export const Menu = ({} : MenuProps) => {

  const [open, setOpen] = useState(false)



  return (
    <MenuContainer open={open} onClick={() => setOpen(!open)}> 

      {open ? 'Menu' : (<i className="fal fa-compass"></i>) }

    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  position: absolute;

  top: 15px;
  left 15px;

  transition-duration: .25s;

  

  

  ${props => {
    if (props.open) {
      return `
        width: 25em;
        border-radius: 12px;

        padding: 1em 1em 1em 1em;

        background: ${ props.theme.primary};
        color: ${ props.theme.background};


      height: 80%;
        transition: height 0.25s ease-in;
      `
    } else {
      return `
      margin: .5em 0 0 .5em;

      font-size: 2em;

      
        transition: height 0.25s ease-in;

      color: ${props.theme.primary};
      
      cursor: pointer;

      :hover {
        color: ${props.theme.secondary};
      }
      `
    }
  }}

  

`