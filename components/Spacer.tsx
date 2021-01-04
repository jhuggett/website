import styled from 'styled-components'
import { BlocksControls } from 'react-tinacms-inline'


export type SpacerOptions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface SpacerProps {
  size?: SpacerOptions
  children?: any
}

export const defaultSpacer: SpacerProps = {
  size: 6
}

export const Spacer = ({
  size = defaultSpacer.size,
  children
} : SpacerProps) => {
  return (
    <Space size={size}>
      {children}
    </Space>
  )
}

const Space = styled.div`
  display: block;
  width: 100%;
  margin: 0 !important;
  height: ${props => props.size}em;

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
    name: 'size',
    label: 'Size',
    component: 'select',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
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