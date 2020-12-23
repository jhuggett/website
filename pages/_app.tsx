import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, TinacmsGithubProvider, GithubMediaStore } from 'react-tinacms-github'
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { useMemo, useState, useRef, useEffect } from 'react';
import Head from 'next/head'
import { SwapTheme } from '../components';
import { Menu } from '../components/Menu';
import { Persistor } from '../Persistancy';
import styled from 'styled-components'

function App({pageProps, Component}) {
  
  const [theme, setTheme] = useState(themes[1].theme)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

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

  const openToggle = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  const closeMenu = () => {
    setMenuIsOpen(false)
  }
  
    return (
      /**
       * 5. Wrap the page Component with the Tina and Github providers
       */
      <ThemeProvider theme={theme}>
        <Head>
          <script src="https://kit.fontawesome.com/7e915e0cd1.js" crossOrigin="anonymous"></script>
        </Head>
        
        <GlobalTheme />
        <TinaProvider cms={memoizedCms}>
          <TinacmsGithubProvider
            onLogin={onLogin}
            onLogout={onLogout}
            error={pageProps.error}
          >
            {/* <EditLink cms={memoizedCms} />
            <button onClick={() => themeHandler.current.swapThemes()}>Swap theme</button> */}
            <Page onClick={() => { if (menuIsOpen) closeMenu() }}>
              <TopBar>
                <TopLeft>
                  <Menu openToggle={openToggle} isOpen={menuIsOpen} cms={memoizedCms} moveDown={pageProps.preview ? '62px' : '0px'}></Menu>
                </TopLeft>
                <TopRight>
                  <SwapTheme themeHandler={themeHandler} moveDown={pageProps.preview ? '62px' : '0px'}></SwapTheme>
                </TopRight>
                
              </TopBar>
              <Content menuIsOpen={menuIsOpen} >
                <Component cms={memoizedCms} themeHandler={themeHandler} {...pageProps} />
              </Content>
            </Page>
            
            
          </TinacmsGithubProvider>
        </TinaProvider>
      </ThemeProvider>
    )
  
}

const TopBar = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  @media (max-width: 62em) {
    position: relative;
  } 
  

  display: flex;
`

const TopRight = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: flex-end;


  padding-right: 2em;
  `

const TopLeft = styled.div`
  flex: 1;


  padding-left: 2em;
  
  display: flex;
  align-items: center;
`

const Page = styled.div`



  width: 100vw;
  height: 100vh;

  overflow-y: hidden;
  overflow-x: hidden;


  @media (max-width: 62em) {
    height: calc(100vh - 75px);
  } 
`

const Content = styled.div`



  width: 100vw;
  height: 100vh;

  ${props => props.menuIsOpen ? `
    // transform: rotate(6deg);
    filter: blur(10px);
  ` : ''}

  overflow-y: auto;
  overflow-x: hidden;

  
  opacity: ${props => props.menuIsOpen ? '.25' : '1'};
  margin-left: ${props => props.menuIsOpen ? '350px' : '0'};

  transition: .25s;


  @media (max-width: 62em) {
    height: calc(100vh - 75px);
  } 

`


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
    height: 100vh;
    width: 100%;

    overflow-y: hidden;
    

    overflow-x: hidden;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 0.25em;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px grey;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 1em;
    opacity: .5;
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
        title: {
          family: 'Georgia',
          size: '4em',
          weight: 'bold'
        },
        general: {
          family: 'Arial',
          size: '1.2em',
          weight: 'thin'
        }
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
        title: {
          family: 'Georgia',
          size: '4em',
          weight: 'bold'
        },
        general: {
          family: 'Arial',
          size: '1.2em',
          weight: 'thin'
        }
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

const themeHandler = new ThemeHandler(themes[1], null)

export default App