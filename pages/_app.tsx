import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, TinacmsGithubProvider, GithubMediaStore } from 'react-tinacms-github'
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { useMemo, useState, useRef, useEffect } from 'react';


function App({pageProps, Component}) {

  const [theme, setTheme] = useState(themes[0].theme)

  const themeHandler = useRef(null)

  useEffect(() => {
    themeHandler.current = new ThemeHandler(themes[0], setTheme)
  }, [])

  const memoizedCms = useMemo(() => {
    const github = new GithubClient({
      proxy: "/api/proxy-github",
      authCallbackRoute: "/api/create-github-access-token",
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME,
      baseBranch: process.env.BASE_BRANCH,
    });
    const cms = new TinaCMS({
      enabled: !!pageProps.preview,
      apis: {
        github,
      },
      media: new GithubMediaStore(github),
      sidebar: pageProps.preview,
      toolbar: pageProps.preview,
    });

    return cms;
  }, []);
  
    return (
      /**
       * 5. Wrap the page Component with the Tina and Github providers
       */
      <ThemeProvider theme={theme}>
        <GlobalTheme />
        <TinaProvider cms={memoizedCms}>
          <TinacmsGithubProvider
            onLogin={onLogin}
            onLogout={onLogout}
            error={pageProps.error}
          >
            {/* <EditLink cms={memoizedCms} />
            <button onClick={() => themeHandler.current.swapThemes()}>Swap theme</button> */}
            <Component {...pageProps} />
          </TinacmsGithubProvider>
        </TinaProvider>
      </ThemeProvider>
    )
  
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch(`/api/preview`, { headers: headers })
  const data = await resp.json()

  if (resp.status == 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export interface EditLinkProps {
  cms: TinaCMS
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}



const GlobalTheme = createGlobalStyle`
  body {
    background: ${props => props.theme.background};
    margin: 0;
    padding: 0;
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
  }

  
`

interface ThemeOption {
  name: string
  theme: any
}

const themes: ThemeOption[] = [
  {
    name: 'Light',
    theme: {
      primary: 'black',
      background: 'white'
    }
  },
  {
    name: 'Dark',
    theme: {
      primary: 'white',
      background: 'black'
    }
  }
]

class ThemeHandler {
  constructor(public currentTheme: ThemeOption, private setTheme) {}

  swapThemes() {
    this.currentTheme = themes.filter((theme) => this.currentTheme.name != theme.name)[0]
    this.setTheme(this.currentTheme.theme)
  }
  
}

export default App