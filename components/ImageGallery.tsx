import React from 'react'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { imageBlock } from './Image'
import styled from 'styled-components'

/**
 * 1. Define the Block Component
 */
function ImageGallery({ index }) {
  return (
    <BlocksControls index={index}  focusRing={{ offset: 0 }} insetControls>
        <StyledInlineBlocks direction={'horizontal'} name="images" blocks={FEATURE_BLOCKS}  />
    </BlocksControls>
  )
}


const StyledInlineBlocks = styled(InlineBlocks)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  
  grid-template-rows: auto;

  align-items: center;
  justify-content: center;

  width: 100%;

`

export const imageGalleryBlock = {
  Component: ImageGallery,
  template: {
    label: 'Image Gallery',
    defaultItem: {
      _template: 'images',
      images: [
        {
          _template: 'image',
          src: 'src',
          alt: 'alt',
          size: 1,
          orientation: 'Horizontal'
        },
      ],
    },
    fields: [],
  },
}



const FEATURE_BLOCKS = {
  image: imageBlock
}