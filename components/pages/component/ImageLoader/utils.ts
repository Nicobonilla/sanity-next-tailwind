// utils.ts
export function getNearestSize(width: number): number {
  const sizes = [1024, 1536, 2048]
  console.log("getNearestSize input:", width) // Depuración
  const nearest = sizes.find(size => width <= size) || 2048
  console.log("getNearestSize output:", nearest) // Depuración
  return nearest
}

export function shouldLoadHighResImage(screenWidth: number): boolean {
  const connection = (navigator as any).connection
  return !connection?.saveData && screenWidth > 768
}

export function calculateOptimalImageSize(containerWidth: number): number {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const effectiveWidth = containerWidth * dpr
  console.log("calculateOptimalImageSize - containerWidth:", containerWidth, "dpr:", dpr, "effectiveWidth:", effectiveWidth) // Depuración
  return getNearestSize(effectiveWidth)
}