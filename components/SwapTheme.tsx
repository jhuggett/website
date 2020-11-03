import { ThemeHandler } from "../pages/_app"
import styled from 'styled-components'

export interface SwapThemeProps {
  themeHandler: ThemeHandler
}

export const SwapTheme = ({ themeHandler }: SwapThemeProps) => {


  return (
    <Button onClick={() => themeHandler.swapThemes()}>
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



position: absolute;
top: 10px;
right: 10px;

padding: 15px 15px 15px 15px;

margin: 10px 10px 10px 10px;

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