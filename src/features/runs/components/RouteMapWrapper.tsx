'use client'

import { type FC } from 'react'
import dynamic from 'next/dynamic'
import type { Coordinate } from '@/features/runs/types'

const RouteMap = dynamic(
  () => import('./RouteMap').then((mod) => mod.RouteMap),
  { ssr: false },
)

type Props = {
  path: Coordinate[]
}

export const RouteMapWrapper: FC<Props> = ({ path }) => {
  return <RouteMap path={path} />
}
