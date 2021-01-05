import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import styled from 'styled-components'

/**
 * 1. Define the Block Component
 */
function Paragraph({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Container>
        <Text>
          <InlineTextarea name="text" focusRing={false} />
        </Text>
      </Container>
    </BlocksControls>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1em 0 1em 0;
  
  word-wrap: break-word;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.p`
  width: 100%;
  margin: 0 1em 0 1em;

  color: ${props => props.theme.primary};

  text-indent: 2em;
  
  font-family: ${props => props.theme.font.general.family};
  font-size: ${props => props.theme.font.general.size};
  font-weight: ${props => props.theme.font.general.weight};

  text-align: justify;
  line-height: 1.75;
`

/**
 * 2. Define the Block
 */
export const paragraphBlock = {
  Component: Paragraph,
  template: {
    label: 'Paragraph',
    defaultItem: {
      text:
        'Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ',
    },
    fields: [],
  },
}
