import { step } from './constants'

export const findNearestDot = coordinate => {
  const abs = coordinate % step
  const round = Math.round(coordinate / 10) * 10
  return abs > (step / 2) ? round % step === 0 ? round : round + step / 2 : coordinate - abs
}
