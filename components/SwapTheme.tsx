import { ThemeHandler } from "../pages/_app"
import styled from 'styled-components'

export interface SwapThemeProps {
  themeHandler: ThemeHandler
  moveDown: string
}

export const SwapTheme = ({ themeHandler, moveDown }: SwapThemeProps) => {


  return (
    <Button onClick={() => themeHandler.swapThemes()} moveDown={moveDown}>
      {themeHandler.currentTheme.name == "Light" &&
        <i className="fal fa-lightbulb-on"></i>
      }
      {themeHandler.currentTheme.name == "Dark" &&
        <i className="fal fa-lightbulb"></i>
      }
      
    </Button>
  )
}

const Button = styled.div`
line-height: 0;



border-radius: 50%;

text-shadow: 0px 0px 8px 2px #888888;

font-size: 2em;

font-family: ${props => props.theme.font.family};

transition-duration: 0.25s;
color: ${props => props.theme.primary};

:hover {
  box-shadow: 0 0 0 0;
  cursor: pointer;
  color: ${props => props.theme.secondary};
}


`