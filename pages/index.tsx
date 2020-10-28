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
      }
    ]
  }

  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <>
    
    <Test>{data.title}</Test>
    
    </>
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

const Test = styled.div`
  font-family: Helvetica;
  font-weight: bold;
  font-size: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`