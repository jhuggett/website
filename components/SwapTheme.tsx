import { ThemeHandler } from "../pages/_app"
import styled from 'styled-components'

export interface SwapThemeProps {
  themeHandler: ThemeHandler
}

export const SwapTheme = ({ themeHandler }: SwapThemeProps) => {


  return (
    <Button onClick={() => themeHandler.swapThemes()}>
      Swap themes
    </Button>
  )
}

const Button = styled.div`

padding: 15px 15px 15px 15px;

margin: 10px 10px 10px 10px;

border-radius: 12px;

font-family: ${props => props.theme.font.family};

transition-duration: 0.25s;
background: ${props => props.theme.primary};
color: ${props => props.theme.background};

:hover {
  cursor: pointer;
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.background};
}


`