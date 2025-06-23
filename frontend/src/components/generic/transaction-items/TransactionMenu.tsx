import ThreeDotsIcon from '@/assets/ThreeDotsIcon'
import { useEffect, useRef, useState } from 'react'
import DetailsModal from './DetailsModal'

export default function TransactionMenu() {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false)
      }
    }

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openMenu])

  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const handleMenuItem = (menuOption: string) => {
    switch (menuOption) {
      case 'Details':
        setShowDetailsModal(true)
        break
      default:
        break
    }
  }
  return (
    <>
      <div
        style={{ cursor: 'pointer' }}
        className="ml-4 relative"
        onClick={() => setOpenMenu(!openMenu)}
        ref={menuRef}
      >
        <ThreeDotsIcon width={24} />
        {openMenu && (
          <div
            className="w-50 bg-white"
            style={{
              position: 'absolute',
              right: 0,
              top: '30px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              zIndex: 1000,
            }}
          >
            <div
              className="text-center hover:bg-gray-100"
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => handleMenuItem('Details')}
            >
              Details
            </div>
          </div>
        )}
        {showDetailsModal && <DetailsModal />}
      </div>
    </>
  )
}
