import { InlineTextarea, BlocksControls } from "react-tinacms-inline";
import styled from 'styled-components'
export function Heading({ text_color, background_color, align, importance}) {

  return (
    <HeroContainer importance={importance} text_color={text_color} background_color={background_color} align={align}>
      <Subtitle>
        <InlineTextarea name="subtext" focusRing={false} />
      </Subtitle>
    </HeroContainer>
  )
}

const Subtitle = styled.div`
  font-family: ${props => props.theme.font.general.family};
  font-size: calc(.25em + ${props => props.theme.font.general.size});
  font-weight: ${props => props.theme.font.general.weight};

  width: 100%;
  
`

export const headingBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}
      focusRing={{ offset: 0 }}
      insetControls
    >
      <Heading {...data} />
    </BlocksControls>
  ),
  template: {
    label: 'Heading',
    defaultItem: {
      headline: 'This is a headline',
      subtext: 'This is the subtext.',
      background_color: 'background',
      text_color: 'primary',
      align: 'center',
    },
    fields: [
      {
        name: 'importance',
        label: 'Importance',
        component: 'select',
        options: [1, 2, 3, 4, 5]
      },
      {
        name: 'background_color',
        label: 'Background Color',
        component: 'select',
        options: ['primary', 'secondary', 'background']
      },
      {
        name: 'text_color',
        label: 'Text Color',
        component: 'select',
        options: ['primary', 'secondary', 'background']
      },
      {
        name: 'align',
        label: 'Alignment',
        component: 'select',
        options: ['flex-start', 'center', 'flex-end']
      }
    ]
  },
}

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || 'center'};
  
  color: ${props => props.theme[props.text_color] || "black"};
  

  height: 100%;

  text-align: center;
  
  flex-grow: ${props => props.importance};


`