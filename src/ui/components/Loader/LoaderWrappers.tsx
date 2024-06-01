// React imports
import styled, {keyframes} from 'styled-components'

// Custom imports


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoaderWrapper = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-inline: inherit;
  margin-block: auto;
`

const LoadingContainerToPage = styled.span`
  width: 100px;
  height: 100px;
  margin-top: calc( 50vh - 114px );
  animation: ${rotate} 2s cubic-bezier(0, 0, 1, 1.02) infinite;
`
const LoadingContainerToPanel = styled(LoadingContainerToPage)`
  margin-top: 33%;

`
export {LoaderWrapper, LoadingContainerToPanel, LoadingContainerToPage}