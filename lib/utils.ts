import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatResolution(width: number, height: number): string {
  return `${width}x${height}`
}

export function getResolutionLabel(width: number, height: number): string {
  const total = width * height
  if (total >= 8294400) return '8K'
  if (total >= 6220800) return '6K'
  if (total >= 4147200) return '4K'
  if (total >= 2073600) return '1440p'
  if (total >= 921600) return '1080p'
  return 'HD'
}
