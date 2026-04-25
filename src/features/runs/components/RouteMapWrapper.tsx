'use client'

import dynamic from 'next/dynamic'
import type { Coordinate } from '@/features/runs/types'

const RouteMap = dynamic(
  () => import('./RouteMap').then((mod) => mod.RouteMap),
  { ssr: false },
)

export function RouteMapWrapper({ path }: { path: Coordinate[] }) {
  return <RouteMap path={path} />
}
