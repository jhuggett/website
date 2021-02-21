import React from 'react'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import styled from 'styled-components'
import { headingBlock } from '../Heading'
import { paragraphBlock } from '../../Paragraph';
import { spacerBlock } from '../../Spacer';
import { titleBlock } from '../Title';
import { imageBlock } from '../Image';


function Section({ index, data }) {
  console.log(data);
  
  return (
    <BlocksControls index={index}  focusRing={{ offset: 0 }} insetControls>
        <StyledInlineBlocks height={data.height} direction={data.direction} name="items" blocks={SECTION_BLOCKS}  />
    </BlocksControls>
  )
}


const StyledInlineBlocks = styled(InlineBlocks)`
  display: flex;
  flex-flow: ${props => props.direction == 'vertical' ? 'column' : 'row'};

  
  
  ${props => props.height == 'full' ? `
    height: 100vh;
  ` : ''}
`

export const sectionBlock = {
  Component: Section,
  template: {
    label: 'Section',
    defaultItem: {
      direction: 'vertical',
      height: 'dynamic',
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
  spacer: spacerBlock
}