import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, TinacmsGithubProvider, GithubMediaStore } from 'react-tinacms-github'
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { useMemo, useState, useRef, useEffect } from 'react';
import Head from 'next/head'
import { SwapTheme } from '../components';
import { Menu } from '../components/Menu';
import { Persistor } from '../Persistancy';


function App({pageProps, Component}) {

  const [theme, setTheme] = useState(themes[0].theme)

  themeHandler.setSetTheme(setTheme)

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

  useEffect(() => {

    const name = Persistor.retrieve('theme-name')?.name 

    if(name) {
      themeHandler.setThemeTo(name)
    }

  }, [])
  
    return (
      /**
       * 5. Wrap the page Component with the Tina and Github providers
       */
      <ThemeProvider theme={theme}>
        <Head>
          <script src="https://kit.fontawesome.com/7e915e0cd1.js" crossOrigin="anonymous"></script>
        </Head>
        <Menu></Menu>
        <SwapTheme themeHandler={themeHandler}></SwapTheme>
        <GlobalTheme />
        <TinaProvider cms={memoizedCms}>
          <TinacmsGithubProvider
            onLogin={onLogin}
            onLogout={onLogout}
            error={pageProps.error}
          >
            {/* <EditLink cms={memoizedCms} />
            <button onClick={() => themeHandler.current.swapThemes()}>Swap theme</button> */}
            <Component cms={memoizedCms} themeHandler={themeHandler} {...pageProps} />
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
      primary: '#171219',
      secondary: '#928C6F',
      background: '#FFFFFA',

      font: {
        family: 'Didot'
      }
    }
  },
  {
    name: 'Dark',
    theme: {
      primary: '#FFFFFA',
      secondary: '#934B00',
      background: '#171219',

      font: {
        family: 'Didot'
      }
    }
  }
]

export class ThemeHandler {
  constructor(public currentTheme: ThemeOption, private setTheme) {}

  setThemeTo(name: string) {
    this.currentTheme = themes.filter(theme => theme.name == name)[0]
    this.setTheme(this.currentTheme.theme)

    Persistor.persist('theme-name', {name: name})
  }

  swapThemes() {
    this.currentTheme = themes.filter((theme) => this.currentTheme.name != theme.name)[0]
    this.setTheme(this.currentTheme.theme)

    Persistor.persist('theme-name', {name: this.currentTheme.name})
  }

  setSetTheme(set) {
    this.setTheme = set
  }
}

const themeHandler = new ThemeHandler(themes[0], null)

export default App