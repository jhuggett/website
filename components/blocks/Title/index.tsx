import { InlineTextarea, BlocksControls } from "react-tinacms-inline";
import styled from 'styled-components'
export function Title({ text_color, background_color, align, importance}) {

  return (
    <HeroContainer importance={importance} text_color={text_color} background_color={background_color} align={align}>
      <TitleStyling>
        <InlineTextarea name="headline" focusRing={false}/>
      </TitleStyling>
    </HeroContainer>
  )
}

const TitleStyling = styled.div`
  font-family: ${props => props.theme.font.title.family};
  font-size: ${props => props.theme.font.title.size};
  font-weight: ${props => props.theme.font.title.weight};
`

export const titleBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}
      focusRing={{ offset: 0 }}
      insetControls
    >
      <Title {...data} />
    </BlocksControls>
  ),
  template: {
    label: 'Title',
    defaultItem: {
      headline: 'This is a headline',
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