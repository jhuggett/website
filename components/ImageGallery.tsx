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
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  grid-template-rows: auto;

  

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