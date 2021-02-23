import styled from 'styled-components'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { EditLink, HeaderLink } from '../components'
import { SwapTheme } from '../components/SwapTheme'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { heroBlock } from '../components/Hero'
import { ContentBody, BodyCenter, BodyRight, BodyLeft } from '../components/PageLayout'
import { imagesBlock } from '../components/Images'
import { paragraphBlock } from '../components/Paragraph'
import { imageGalleryBlock } from '../components/ImageGallery'
import { useEffect, useState } from 'react'
import { WithLayout } from '../components/Layout'
import { sectionBlock } from '../components/blocks/Section'

export default function Home({file, blurNotifier, cms, themeHandler}) {

  const [data, form] = useGithubJsonForm(file)
  usePlugin(form)

  const [enterPressed, setEnterPressed] = useState(false)

  useGithubToolbarPlugins()

  useEffect(() => {

    const onKeyPress = (e) => {
      if (e.key == 'Enter' && !enterPressed) {
        setEnterPressed(true)
      }
    }


    const onKeyUp = (e) => {
      if (e.key == 'Enter') {
        window.location.href = '/backdoor'
      }
    }

    window.addEventListener('keydown', onKeyPress)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyPress)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return enterPressed ? <></> : (
    <InlineForm form={form}>
      <WithLayout toggleBlur={blurNotifier}>
      <InlineBlocks name="blocks" className="inline-block" blocks={TESTIMONIAL_BLOCKS} />
      </WithLayout>
    </InlineForm>
  )
}

const TESTIMONIAL_BLOCKS = {
  section: sectionBlock
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

