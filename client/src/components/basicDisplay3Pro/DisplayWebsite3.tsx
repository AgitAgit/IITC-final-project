import React, { useEffect, useState } from 'react'
import { BasicEditor3Page, BasicEditor3Website } from '../basicEditor3Pro/BasicEditor3ProTypes'
import Header3 from '../basicEditor3Pro/Header3'

import { hydrateWebsite } from '../basicEditor3Pro/utils'

export type DisplayWebsite3Props = {
  websiteData: BasicEditor3Website
}

function DisplayWebsite3({ websiteData }: DisplayWebsite3Props) {
  const [website, setWebsite] = useState<BasicEditor3Website>()
  const [currentPage, setCurrentPage] = useState<BasicEditor3Page>();

  useEffect(() => {
    hydrateWebsite(websiteData)
    setWebsite(websiteData);
    setCurrentPage(websiteData.pages[0])
  }, [])

  return (
    <div>
      {
        website && currentPage?.renderElements.map(element => element.body)
      }
    </div>
  )
}

export default DisplayWebsite3