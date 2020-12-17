import { TinaCMS } from "tinacms"
import styled from "styled-components"

export interface EditLinkProps {
  cms: TinaCMS
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return (
      <Button onClick={() => cms.toggle()}>
        {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
      </Button>
  )
}

const Button = styled.div`
  display: inline-block;
  
  padding: .5em .5em .5em .5em;

  margin: 10px 10px 10px 10px;

  border-radius: 12px;

  font-family: ${props => props.theme.font.family};

  transition-duration: 0.25s;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.background};

  border: 2px solid ${props => props.theme.background};

  font-family: ${props => props.theme.font.title.family};
  font-size: 1em;
  font-weight: ${props => props.theme.font.title.weight};

  transition: .25s;

  :hover {

    transform: translate(-2px, -2px);
    cursor: pointer;
    border: 2px solid ${props => props.theme.secondary};
    color: ${props => props.theme.secondary};
  }

`