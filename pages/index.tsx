import styled from 'styled-components'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { EditLink } from '../components'
import { SwapTheme } from '../components/SwapTheme'

export default function Home({file, cms, themeHandler}) {
  
  const formOptions = {
    labeL: 'Home Page',
    fields: [
      {
        name: 'title',
        component: 'text'
      },
      {
        name: 'blurb',
        component: 'text'
      }
    ]
  }

  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <Container>
      <Header></Header>

      <Body>
        <Title>{data.title}</Title>

        <Blurb>{data.blurb}</Blurb>
      </Body>

      <Footer>
        <EditLink cms={cms}></EditLink>
        <SwapTheme themeHandler={themeHandler}></SwapTheme>
      </Footer>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default
      }
    }
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;


  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: 100%;

  flex-grow: 1;
  
`

const Body = styled.div`
  width: 100%;

  flex-grow: 10;
  


  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Footer = styled.div`
  width: 100%;

  flex-grow: 1;
  
  bottom: 0;
  position: abosolte
`

const Title = styled.div`
color: ${props => props.theme.primary};
font-family: Helvetica;
font-weight: bold;
font-size: 3em;
`

const Blurb = styled.div`
color: ${props => props.theme.primary};
font-family: Helvetica;
font-weight: ;
font-size: 2em;
`

