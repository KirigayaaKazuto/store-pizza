import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton = () => {
  return (
    <ContentLoader 
      className='pizza-block'
      speed={2}
      width={280}
      height={468}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="125" r="120" /> 
      <rect x="6" y="272" rx="10" ry="10" width="270" height="27" /> 
      <rect x="0" y="315" rx="14" ry="14" width="280" height="88" /> 
      <rect x="0" y="430" rx="10" ry="10" width="95" height="30" /> 
      <rect x="142" y="428" rx="10" ry="10" width="130" height="36" />
    </ContentLoader>

  )
}
