import React from 'react'
import { BlocksControls, InlineTextarea, InlineImage } from 'react-tinacms-inline'
import styled from 'styled-components'
import * as NextImage from 'next/image'
import { useCMS } from 'tinacms'

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

  // const baseDimentions = getBaseDimentions(data.orientation)
  
  // baseDimentions.height * data.size || 1
  // baseDimentions.width * data.size || 1
  const cms = useCMS()

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

          {props => <StyledNextImage src={props.src} alt={props.alt} layout="fill" width={data.width} height={data.height} />}
        </ImageStyle>
    </BlocksControls>
    </Container>
  )
}

const StyledNextImage = styled(NextImage.default)`
  width: 100%;
  height: 100%;

  border-radius: 4px;
  background: ${props => props.theme.loadingImageColor};
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

padding-top: 1em;
padding-bottom: 1em;

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
      width: '500',
      height: '200'
    },
    fields: [
      {
        name: 'width',
        label: 'Width',
        component: 'text'
      },
      {
        name: 'height',
        label: 'Height',
        component: 'text'
      }
    ],
  },
}