import styled from 'styled-components'


export interface HeaderLinkProps {
  name: string
  link: string
}

export const HeaderLink = ({name, link} : HeaderLinkProps) => {

  return (
    <Styling href={link}>
      {name}
    </Styling>
  )
}

const Styling = styled.a`
  font-family: ${props => props.theme.font.family};
  margin: 0em 1.5em 0em 1.5em;

  font-size: 1.25em;
  
  color: ${props => props.theme.primary};

`