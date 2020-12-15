import { InlineTextField, InlineTextarea, BlocksControls } from "react-tinacms-inline";
import styled from 'styled-components'

export function Hero({ text_color, background_color, align}) {

  return (
    <HeroContainer text_color={text_color} background_color={background_color} align={align}>
      <h1>
        <InlineTextarea name="headline" focusRing={false}/>
      </h1>

      <p>
        <InlineTextarea name="subtext" focusRing={false} />
      </p>
    </HeroContainer>
  )
}

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
      background_color: 'white',
      text_color: 'black',
      align: 'center',
    },
    fields: [
      {
        name: 'background_color',
        label: 'Background Color',
        component: 'color',
        widget: 'block',
        colors: ['white', 'black']
      },
      {
        name: 'text_color',
        label: 'Text Color',
        component: 'color',
        widget: 'block',
        colors: ['white', 'black']
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

  color: ${props => props.text_color || "black"};
  background: ${props => props.background_color || 'white'};
  textAlign: aligin;

`