import { TinaCMS } from "tinacms"
import styled from "styled-components"

export interface EditLinkProps {
  cms: TinaCMS
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return (
    <div>
      <Button onClick={() => cms.toggle()}>
        {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
      </Button>
    </div>
  )
}

const Button = styled.div`
  padding: 15px 15px 15px 15px;

  margin: 10px 10px 10px 10px;

  border-radius: 12px;

  font-family: ${props => props.theme.font.family};

  transition-duration: 0.25s;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.background};

  :hover {
    
    cursor: pointer;
    background: ${props => props.theme.secondary};
    color: ${props => props.theme.background};
  }

`