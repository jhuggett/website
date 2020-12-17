import { InlineTextField, InlineTextarea, BlocksControls } from "react-tinacms-inline";
import styled from 'styled-components'

export function Hero({ text_color, background_color, align}) {

  return (
    <HeroContainer text_color={text_color} background_color={background_color} align={align}>
      <Title>
        <InlineTextarea name="headline" focusRing={false}/>
      </Title>

      <Subtitle>
        <InlineTextarea name="subtext" focusRing={false} />
      </Subtitle>
    </HeroContainer>
  )
}

const Title = styled.div`
  font-family: ${props => props.theme.font.title.family};
  font-size: ${props => props.theme.font.title.size};
  font-weight: ${props => props.theme.font.title.weight};
`

const Subtitle = styled.div`
  font-family: ${props => props.theme.font.general.family};
  font-size: ${props => props.theme.font.general.size};
  font-weight: ${props => props.theme.font.general.weight};

  width: 75%;
`

export const heroBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}
      focusRing={{ offset: 0 }}
      insetControls
    >
      <Hero {...data} />
    </BlocksControls>
  ),
  template: {
    label: 'Hero',
    defaultItem: {
      headline: 'This is a headline',
      subtext: 'This is the subtext.',
      background_color: 'background',
      text_color: 'primary',
      align: 'center',
    },
    fields: [
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
  padding: 1em 0 1em 0;
  color: ${props => props.theme[props.text_color] || "black"};
  background: ${props => props.theme[props.background_color] || 'white'};
  text-align: center;

`