import { InlineTextarea, BlocksControls } from "react-tinacms-inline";
import styled from 'styled-components'
import Link from "next/link";

const externalLogos = {
  github: '<i class="fab fa-github"></i>',
  npm: '<i class="fab fa-npm"></i>',
  other: '<i class="fas fa-link"></i>'
}

function getLogoFor(logo: string) : string {
  return externalLogos[logo] || ''
}

export function ExternalLink({ logo, link, text }) {

  return (
    <Container >
      <LinkStyling href={link} target="_blank">
        <TextStyle>
        <div dangerouslySetInnerHTML={{ __html: getLogoFor(logo) }} />
          <Text>{text}</Text>
        </TextStyle>
      </LinkStyling>
    </Container>
  )
}

const Text = styled.div`
  margin-left: .25em;

  transition-duration: 0.2s;

  :hover {
    color: ${props => props.theme.secondary};
    cursor: pointer;
    text-decoration: underline;
  }
`

const TextStyle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  font-family: ${props => props.theme.font.general.family};
  font-size: 2em;
  font-weight: ${props => props.theme.font.general.weight};
  color: ${props => props.theme.primary};

  
`

const LinkStyling = styled(Link)`
  
`

export const externalLinkBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}
      focusRing={{ offset: 0 }}
      insetControls
    >
      <ExternalLink {...data} />
    </BlocksControls>
  ),
  template: {
    label: 'External Link',
    defaultItem: {
      logo: 'other',
      link: '',
      text: 'Needs a link'
    },
    fields: [
      {
        name: 'logo',
        label: 'Logo',
        component: 'select',
        options: Object.keys(externalLogos)
      },
      {
        name: 'link',
        label: 'URL',
        component: 'text'
      },
      {
        name: 'text',
        label: 'Text',
        component: 'text'
      },
    ]
  },
}

const Container = styled.div`
  margin-top: 1em;
  

`