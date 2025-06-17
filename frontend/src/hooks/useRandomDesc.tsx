import descriptions from '../../public/mocks/mockDescriptions.json'

export function useRandomDescription() {
  const index = Math.floor(Math.random() * descriptions.length)
  return descriptions[index]
}
