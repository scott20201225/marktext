import { describe, expect, it } from 'vitest'

import { compactMenuTemplate } from 'main_renderer/ipc/menuTemplate'

describe('compactMenuTemplate', () => {
  it('removes hidden submenu items and collapses leftover separators', () => {
    const template = compactMenuTemplate([
      {
        id: 'tableSubmenuMenuItem',
        label: 'Table',
        type: 'submenu',
        submenu: [
          { id: 'insertTableMenuItem', label: 'Insert table' },
          { id: 'tableRowSeparator', type: 'separator', visible: false },
          { id: 'tableInsertRowAboveMenuItem', label: 'Insert row above', visible: false },
          { id: 'tableInsertRowBelowMenuItem', label: 'Insert row below', visible: false },
          { id: 'tableColumnSeparator', type: 'separator', visible: false },
          { id: 'tableInsertColumnLeftMenuItem', label: 'Insert column left', visible: false },
          { id: 'tableDeleteSeparator', type: 'separator', visible: false },
          { id: 'tableDeleteMenuItem', label: 'Delete table', visible: false }
        ]
      }
    ])

    const submenu = template[0]?.submenu
    expect(Array.isArray(submenu)).toBe(true)
    expect(submenu).toEqual([
      { id: 'insertTableMenuItem', label: 'Insert table' }
    ])
  })

  it('drops leading, trailing, and adjacent separators recursively', () => {
    const template = compactMenuTemplate([
      { type: 'separator' },
      { label: 'A' },
      { type: 'separator' },
      { type: 'separator' },
      {
        label: 'Nested',
        type: 'submenu',
        submenu: [
          { type: 'separator' },
          { label: 'B' },
          { type: 'separator' },
          { type: 'separator' }
        ]
      },
      { type: 'separator' }
    ])

    expect(template).toHaveLength(3)
    expect(template[0]?.label).toBe('A')
    expect(template[1]?.type).toBe('separator')
    expect(template[2]?.submenu).toEqual([{ label: 'B' }])
  })
})
