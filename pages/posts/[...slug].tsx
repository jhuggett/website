import glob from 'glob'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { usePlugin, useForm } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { ContentBody, BodyLeft, BodyCenter, BodyRight } from '../../components/PageLayout'
import { heroBlock } from '../../components/Hero'
import { imageGalleryBlock } from '../../components/ImageGallery'
import { paragraphBlock } from '../../components/Paragraph'
import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useEffect, useState } from 'react'
import { spacerBlock } from '../../components/Spacer'
import { sectionBlock } from '../../components/blocks/Section'
import { Page, Space, Content, WithLayout } from '../../components/Layout'

export default function BlogTemplate({file, blurNotifier, cms, themeHandler, preview}) {
  
  const [_, form] = useGithubJsonForm(file)
  usePlugin(form)

  useGithubToolbarPlugins()

  // Render data from `getStaticProps`
  return (
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
  previewData,
  ...ctx
}) {
  console.log(preview, previewData, ctx);
  
  const { slug } = ctx.params
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: `content/posts/${slug}.json`,
      parse: parseJson
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: `content/posts/${slug}.json`,
        data: (await import(`../../content/posts/${slug}.json`)).default
      }
    }
  }
}


export async function getStaticPaths() {
  //get all .md files in the posts dir
  const blogs = glob.sync('content/posts/*.json')

  console.log(blogs);
  
  //remove path and extension to leave filename only
  const blogSlugs = blogs.map(file =>
    file
      .split('/')[2]
      .replace(/ /g, '-')
      .slice(0, -5)
      .trim()
  )

  console.log(blogSlugs);
  

  // create paths with `slug` param
  const paths = blogSlugs.map(slug => `/posts/${slug}`)  

  console.log(paths);
  
  
  return {
    paths,
    fallback: false,
  }
}