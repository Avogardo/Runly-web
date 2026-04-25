'use client'

import { type FC } from 'react'
import dynamic from 'next/dynamic'

import type { Coordinate } from '../types'

const RouteMap = dynamic(() => import('./RouteMap').then((mod) => mod.RouteMap), { ssr: false })

type RouteMapWrapperProps = {
  path: Coordinate[]
}

export const RouteMapWrapper: FC<RouteMapWrapperProps> = ({ path }) => {
  return <RouteMap path={path} />
}
