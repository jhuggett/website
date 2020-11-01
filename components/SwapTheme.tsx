import { ThemeHandler } from "../pages/_app"

export interface SwapThemeProps {
  themeHandler: ThemeHandler
}

export const SwapTheme = ({ themeHandler }: SwapThemeProps) => {


  return (
    <button onClick={() => themeHandler.swapThemes()}>
      Swap themes
    </button>
  )
}