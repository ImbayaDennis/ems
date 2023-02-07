import {type ReactElement} from 'react'

const withOrgDetails = (OriginalComponent: ReactElement) => {
  function EnhancedComponent() {
    return OriginalComponent
  }
}

export default withOrgDetails