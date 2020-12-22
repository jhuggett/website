import React from 'react'
import { BlocksControls, InlineTextarea, InlineImage } from 'react-tinacms-inline'
import styled from 'styled-components'
import * as NextImage from 'next/image'

function getBaseDimentions(orientation) {
  switch(orientation) {
    case 'Horizontal': {
      return {
        width: 200,
        height: 150
      }
    }
    case 'Vertical': {
      return {
        width: 175,
        height: 200
      }
    }
    case 'Square': {
      return {
        width: 200,
        height: 200
      }
    }
  }

  return {
    width: 100,
    height: 100
  }
}

export function Image({ index, data }) {

  const baseDimentions = getBaseDimentions(data.orientation)
  
  return (
    <Container>
    <BlocksControls index={index}>
      <ImageStyle
            name={`name`}
            parse={media => `/${media.filename}`}
            uploadDir={() => '/public'}
            previewSrc={(src) => src}
            focusRing={false}
            alt={''}
          >

          {props => <StyledNextImage src={props.src} alt={props.alt} layout="fill" width={baseDimentions.width * data.size || 1} height={baseDimentions.height * data.size || 1} />}
        </ImageStyle>
    </BlocksControls>
    </Container>
  )
}

const StyledNextImage = styled(NextImage.default)`
  width: 100%;
  height: 100%;
`

const Container = styled.div`
 width: 100%;
 height: 100%;
 
 display: flex;
align-items: center;
justify-content: center;
`

const ImageStyle = styled(InlineImage)`
width: 90%;
height: 100%;

display: flex;
align-items: center;
justify-content: center;
`

export const imageBlock = {
  Component: Image,
  template: {
    label: 'Image',
    
    defaultItem: {
      size: 1,
      src: '/ivan-bandura-unsplash-square.jpg',
      alt: 'ocean',
      orientation: 'Horizontal'
    },
    fields: [
      {
        name: 'size',
        label: 'Size Multiplier',
        component: 'number'
      },
      {
        name: 'orientation',
        label: 'Orientation',
        component: 'select',
        options: ['Horizontal', 'Vertical', 'Square']
      },
        ],
  },
}