import React from 'react'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import styled from 'styled-components'
import { headingBlock } from '../Heading'
import { paragraphBlock } from '../../Paragraph';
import { spacerBlock } from '../Spacer';
import { titleBlock } from '../Title';
import { imageBlock } from '../Image';
import { externalLinkBlock } from '../External Link';


function Section({ index, data }) {
  return (
    <BlocksControls index={index}  focusRing={{ offset: 0 }} insetControls>
        <StyledInlineBlocks height={data.height} direction={data.direction} max_width={data.max_width} name="items" blocks={SECTION_BLOCKS}  />
    </BlocksControls>
  )
}


const StyledInlineBlocks = styled(InlineBlocks)`
  display: flex;
  flex-flow: ${props => props.direction == 'vertical' ? 'column' : 'row'};

  width: 100%;
  max-width: 100%;

  

  align-items: center;
  justify-content: center;
  
  ${props => props.height == 'full' ? `
    min-height: 100vh;
  ` : ''}
`

export const sectionBlock = {
  Component: Section,
  template: {
    label: 'Section',
    defaultItem: {
      direction: 'vertical',
      height: 'dynamic',
      max_width: 10,
      items: [
        
      ]
    },
    fields: [
      {
        name: 'direction',
        label: 'Flow Direction',
        component: 'select',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'height',
        label: 'Height',
        component: 'select',
        options: ['dynamic', 'full']
      },
      {
        name: 'max_width',
        label: 'Max Width (in %)',
        component: 'number'
      }
    ],
  },
}



const SECTION_BLOCKS = {
  section: sectionBlock,
  title: titleBlock,
  heading: headingBlock,
  paragraph: paragraphBlock,
  image: imageBlock,
  externalLink: externalLinkBlock,
  spacer: spacerBlock
}