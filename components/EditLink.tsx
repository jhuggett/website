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

`