'use client'

import dynamic from 'next/dynamic'
import type { Coordinate } from '@/features/runs/types'

const RouteMap = dynamic(() => import('./RouteMap'), { ssr: false })

export default function RouteMapWrapper({ path }: { path: Coordinate[] }) {
  return <RouteMap path={path} />
}

