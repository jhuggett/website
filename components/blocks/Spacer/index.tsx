import styled from 'styled-components'
import { BlocksControls } from 'react-tinacms-inline'



export interface SpacerProps {
  width: string
  height: string
  children?: any
}

export const defaultSpacer: SpacerProps = {
  height:'50px',
  width: '50px'
}

export const Spacer = ({
  width,
  height,
  children
} : SpacerProps) => {
  return (
    <Space width={width} height={height}>
      {children}
    </Space>
  )
}

const Space = styled.div`
  display: block;
  width: 100%;
  margin: 0 !important;
  width: ${props => props.width};
  height: ${props => props.height};


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
    name: 'width',
    label: 'Width',
    component: 'text'
  },
  {
    name: 'height',
    label: 'Height',
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