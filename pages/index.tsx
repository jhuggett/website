import styled from 'styled-components'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

export default function Home({file}) {
  
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

      <Footer></Footer>
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

  background-color: green;

  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: 100%;
  height: 10em;
  background-color: red;
`

const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;


  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Footer = styled.div`
  width: 100%;
  height: 4em;
  background-color: yellow;
  bottom: 0;
  position: abosolte
`

const Title = styled.div``

const Blurb = styled.div``

const Test = styled.div`
  color: ${props => props.theme.primary};
  font-family: Helvetica;
  font-weight: bold;
  font-size: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`