import descriptions from '../../../public/mocks/mockDescriptions.json'

export function useRandomDesc() {
  const index = Math.floor(Math.random() * descriptions.length)
  return descriptions[index]
}
