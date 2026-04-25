'use client'

import { type FC, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import {
  MAP_DEFAULT_ZOOM,
  MAP_FIT_BOUNDS_PADDING,
  ROUTE_POLYLINE_WEIGHT,
  ROUTE_POLYLINE_OPACITY,
  ROUTE_POLYLINE_COLOR,
  MARKER_SIZE,
  MARKER_ANCHOR,
  START_MARKER_COLOR,
  END_MARKER_COLOR,
} from '../consts'
import type { Coordinate } from '../types'

type RouteMapProps = {
  path: Coordinate[]
}

function createCircleIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="width:${MARKER_SIZE}px;height:${MARKER_SIZE}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 6px ${color}"></div>`,
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    iconAnchor: [MARKER_ANCHOR, MARKER_ANCHOR],
  })
}

const startIcon = createCircleIcon(START_MARKER_COLOR)
const endIcon = createCircleIcon(END_MARKER_COLOR)

function FitBounds({ positions }: { positions: L.LatLngExpression[] }) {
  const map = useMap()

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions)
      map.fitBounds(bounds, { padding: [MAP_FIT_BOUNDS_PADDING, MAP_FIT_BOUNDS_PADDING] })
    }
  }, [map, positions])

  return null
}

export const RouteMap: FC<RouteMapProps> = ({ path }) => {
  const positions: L.LatLngExpression[] = path.map((p) => [p.latitude, p.longitude])
  const start = positions[0]
  const end = positions[positions.length - 1]

  if (!start || !end) return null

  return (
    <div className="w-full h-80 sm:h-100 rounded-2xl overflow-hidden border border-surface-border shadow-[0_0_30px_rgba(168,85,247,0.08)] [&_.leaflet-control-attribution]:text-[8px] [&_.leaflet-control-attribution]:bg-black/50 [&_.leaflet-control-attribution]:text-white/60 [&_.leaflet-control-attribution]:backdrop-blur-sm [&_.leaflet-control-attribution_a]:text-white/70">
      <MapContainer
        center={start}
        zoom={MAP_DEFAULT_ZOOM}
        className="w-full h-full"
        zoomControl={false}
      >
        {/* Localhost lighter version  */}
        {/*<TileLayer*/}
        {/*  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"*/}
        {/*  attribution='&copy; <a href="https://stadiamaps.com/">Stadia</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'*/}
        {/*/>*/}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.15}
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          opacity={0.85}
        />
        <Polyline
          positions={positions}
          pathOptions={{
            color: ROUTE_POLYLINE_COLOR,
            weight: ROUTE_POLYLINE_WEIGHT,
            opacity: ROUTE_POLYLINE_OPACITY,
          }}
        />
        <Marker position={start} icon={startIcon} />
        <Marker position={end} icon={endIcon} />
        <FitBounds positions={positions} />
      </MapContainer>
    </div>
  )
}
