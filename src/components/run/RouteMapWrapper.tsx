'use client'

import dynamic from 'next/dynamic'

type Coordinate = {
  latitude: number
  longitude: number
}

const RouteMap = dynamic(() => import('./RouteMap'), { ssr: false })

export default function RouteMapWrapper({ path }: { path: Coordinate[] }) {
  return <RouteMap path={path} />
}

