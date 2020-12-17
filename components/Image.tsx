import React from 'react'
import { BlocksControls, InlineTextarea, InlineImage } from 'react-tinacms-inline'
import styled from 'styled-components'
import * as NextImage from 'next/image'

export function Image({ index, size }) {
  return (
    <Container>
    <BlocksControls index={index}>
      <ImageStyle
            name={`${index}-image`}
            parse={media => `/${media.filename}`}
            uploadDir={() => '/public'}
            previewSrc={(src) => src}
            focusRing={false}
            alt={''}
          >

          {props => <StyledNextImage src={props.src} alt={props.alt} width={200 * size} height={150 * size} />}
        </ImageStyle>
    </BlocksControls>
    </Container>
  )
}

const StyledNextImage = styled(NextImage.default)`
  // position: relative;

  // & < img {
  //   position: relative !important;
  // }

`

const Container = styled.div`
`

const ImageStyle = styled(InlineImage)`

`

export const imageBlock = {
  Component: Image,
  template: {
    label: 'Image',
    
    defaultItem: {
      size: 1,
      src: '/ivan-bandura-unsplash-square.jpg',
      alt: 'ocean',
      
    },
    fields: [
      {
        name: 'size',
        label: 'Size Multiplier',
        component: 'number'
      },
        ],
  },
}