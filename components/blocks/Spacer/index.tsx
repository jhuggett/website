import styled from 'styled-components'
import { BlocksControls } from 'react-tinacms-inline'



export interface SpacerProps {
  max_width: string
  children?: any
}

export const defaultSpacer: SpacerProps = {
  max_width: '50%'
}

export const Spacer = ({
  max_width,
  children
} : SpacerProps) => {
  return (
    <Space max_width={max_width}>
      {children}
    </Space>
  )
}

const Space = styled.div`
  display: block;
  width: 100%;
  margin: 0 !important;
  width: ${props => props.max_width};

  min-height: 50px;
  height: 100%;

`

interface SpacerBlockProps {
  data: SpacerProps
  index: number
}

function SpacerBlock({data, index}: SpacerBlockProps) {
  return (
    <Spacer {...data}>
      <BlocksControls focusRing={{offset: 16}} index={index}>
        {null}
      </BlocksControls>
    </Spacer>
  )
}

export const spacerBlockFields = [
  {
    name: 'max_width',
    label: 'Max Width',
    component: 'text'
  }
];

export const spacerBlock = {
  Component: SpacerBlock,
  template: {
    type: 'spacer',
    label: 'Spacer',
    defaultItem: {
      ...defaultSpacer,
    },
    fields: spacerBlockFields,
  },
};