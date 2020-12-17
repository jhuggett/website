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

export default function Home({file, cms, themeHandler}) {

  const [data, form] = useGithubJsonForm(file)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <InlineForm form={form}>
      <ContentBody>
        <BodyLeft>

        </BodyLeft>

        <BodyCenter>
          <InlineBlocks name="blocks" className="inline-block" blocks={TESTIMONIAL_BLOCKS} />
          
        </BodyCenter>

        <BodyRight>
          
        </BodyRight>

      </ContentBody>
    </InlineForm>
  )
}

const TESTIMONIAL_BLOCKS = {
  hero: heroBlock,
  images: imageGalleryBlock,
  paragraph: paragraphBlock
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

