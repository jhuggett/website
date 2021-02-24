import React from 'react'
import { BlocksControls, InlineTextarea, InlineImage } from 'react-tinacms-inline'
import styled from 'styled-components'
import * as NextImage from 'next/image'


export function Image({ index, data }) {

  return (
    <Container>
    <BlocksControls index={index}>
      <ImageStyle 
            name={`src`}
            parse={media => `${media.directory || '/'}${media.filename}`}
            uploadDir={() => ''}
            focusRing={false}
            alt={''}
          >

          {props => <StyledNextImage unsized max_width={data.max_width} src={props.src} alt={props.alt} layout="fill"  />}
        </ImageStyle>
    </BlocksControls>
    </Container>
  )
}

const StyledNextImage = styled(NextImage.default)`
  
  

  max-width: ${props => props.max_width};
  border-radius: 20px;
  background: ${props => props.theme.loadingImageColor};
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  

  padding: 0 .5em 0 .5em;

`

const ImageStyle = styled(InlineImage)`

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

padding-top: .5em;
padding-bottom: .5em;



`

export const imageBlock = {
  Component: Image,
  template: {
    label: 'Image',
    
    defaultItem: {
      size: 1,
      src: '/ivan-bandura-unsplash-square.jpg',
      alt: 'ocean',
      max_width: '100%'
    },
    fields: [
      {
        name: 'max_width',
        label: 'Max width',
        component: 'text'
      }
    ],
  },
}