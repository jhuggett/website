import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Notifier } from '../pages/_app'

export const Page = styled.div`

width: 100%;
min-height: calc(100vh - 75px);
display: flex;

${props => props.shouldBlur ? `
    filter: blur(5px);
  ` : ''}

  transition-duration: 0.25s;

flex-direction: row;
align-items: center;
justify-items: center;


`

export const Content = styled.div`
display: flex;
align-items: center;
justify-content: center;

width: 60em;
min-width: 100%;
height: 100%;
min-height: 5em;
`

export const Space = styled.div`
flex: 1;
height: 100%;
min-height: 5em;
`

export interface WithLayoutProps {
  toggleBlur: Notifier
  children?: any
}

export const WithLayout = ({ toggleBlur, children }: WithLayoutProps) => {

  const [isBlurred, setBlur] = useState(false)

  useEffect(() => {
    toggleBlur.subscribe((payload) => {
      setBlur(payload.shouldBlur)
    })
  }, [])

  return (
    <Page shouldBlur={isBlurred}>
      <Space />
      <Content>
        {children}
      </Content>
      <Space />
    </Page>
  )
}

