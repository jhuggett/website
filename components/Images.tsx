import React from 'react'
import { BlocksControls, InlineImage } from 'react-tinacms-inline'
import styled from 'styled-components'
import Image from 'next/image'


/**
 * 1. Define the Block Component
 */
function Images({ data, index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Container>
        <Gallery>
          <ImageSection>
          <ImageStyle
            name="left.src"
            parse={media => `/${media.filename}`}
            uploadDir={() => '/public'}
            previewSrc={(src) => src}
            focusRing={false}
            alt={data.left.alt}
          >
            {props => <Image src={props.src} alt={data.alt} width={500} height={250} />}
            </ImageStyle>
          </ImageSection>
          <ImageSection>
          <ImageStyle
            name="right.src"
            parse={media => `/${media.filename}`}
            uploadDir={() => '/public'}
            previewSrc={(src) => src}
            focusRing={false}
            alt={data.left.alt}
          >
              {props => <Image src={props.src} alt={data.alt} width={500} height={250} />}
            </ImageStyle>
          </ImageSection>
          
          
        </Gallery>
      </Container>
    </BlocksControls>
  )
}

const ImageStyle = styled(InlineImage)`
width: 100%;
display: flex;
justify-content: center;
align-items: center;

& > img {
  max-width: 100%;
}
`

const ImageSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

`

const Gallery = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`

const Container = styled.div`
  display: flex;
  width: 100%;
`

/**
 * 2. Define the Block with
 *  the Template and Component
 */
export const imagesBlock = {
  Component: Images,
  template: {
    label: 'Image Diptych',
    defaultItem: {
      _template: 'images',
      left: {
        src: '/ivan-bandura-unsplash-square.jpg',
        alt: 'ocean',
      },
      right: {
        src: '/martin-sanchez-unsplash-square.jpg',
        alt: 'dunes',
      },
    },
    fields: [
      {
        name: 'left.src',
        label: 'Left-Hand Image',
        component: 'image',
        parse: media => `/${media.filename}`,
        uploadDir: () => '/public',
        previewSrc: (src) => src,
        focusRing: false,
      },
      {
        name: 'left.alt',
        label: 'Left-Hand Image Alt Text',
        component: 'text',
      },
      {
        name: 'right.src',
        label: 'Right-Hand Image',
        component: 'image',
        parse: media => `/${media.filename}`,
        uploadDir: () => '/public',
        previewSrc: (src) => src,
        focusRing: false,
      },
      {
        name: 'right.alt',
        label: 'Right-Hand Image Alt Text',
        component: 'text',
      },
    ],
  },
}