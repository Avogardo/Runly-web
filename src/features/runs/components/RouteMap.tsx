'use client'

import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Coordinate } from '@/features/runs/types'

type Props = {
  path: Coordinate[]
}

// Custom colored circle markers
function createCircleIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 6px ${color}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

const startIcon = createCircleIcon('#34D399') // emerald/green
const endIcon = createCircleIcon('#A855F7') // purple

// Auto-fit map to route bounds
function FitBounds({ positions }: { positions: L.LatLngExpression[] }) {
  const map = useMap()

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions)
      map.fitBounds(bounds, { padding: [40, 40] })
    }
  }, [map, positions])

  return null
}

export default function RouteMap({ path }: Props) {
  const positions: L.LatLngExpression[] = path.map((p) => [p.latitude, p.longitude])
  const start = positions[0]
  const end = positions[positions.length - 1]

  if (!start || !end) return null

  return (
    <div className="w-full h-80 sm:h-100 rounded-2xl overflow-hidden border border-surface-border shadow-[0_0_30px_rgba(168,85,247,0.08)] [&_.leaflet-control-attribution]:text-[8px] [&_.leaflet-control-attribution]:bg-black/40 [&_.leaflet-control-attribution]:text-white/30 [&_.leaflet-control-attribution]:backdrop-blur-sm [&_.leaflet-control-attribution_a]:text-white/40">
      <MapContainer
        center={start}
        zoom={14}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Polyline positions={positions} pathOptions={{ color: '#A855F7', weight: 4, opacity: 0.9 }} />
        <Marker position={start} icon={startIcon} />
        <Marker position={end} icon={endIcon} />
        <FitBounds positions={positions} />
      </MapContainer>
    </div>
  )
}

