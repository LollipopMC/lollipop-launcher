import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import type { MenuItem } from 'primereact/menuitem'
import { CaretRightCircle, Cog, Cube } from '@styled-icons/boxicons-solid'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const menuList: (MenuItem & { url: string })[] = [
  {
    label: 'Main',
    icon: options => <CaretRightCircle size={24} {...options?.iconProps} />,
    url: '/main',
  },
  {
    label: 'Modules',
    icon: options => <Cube size={24} {...options?.iconProps} />,
    url: '/module',
  },
  {
    label: 'Setting',
    icon: options => <Cog size={24} {...options?.iconProps} />,
    url: '/setting',
  },
]

function NavigationButtons({ model }: { model: MenuItem[] }) {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const currentPath = pathname.split('/')[1]
  function isActive(path: string) {
    return currentPath === path
  }
  return (
    <div className="flex items-center gap-4">
      {
        model.map((item: (MenuItem & { url: string }), index) => {
          const path = item.url.split('/')[1]
          const translateKey = `navigationMenu.${path}`
          return (
            <Link
              key={index}
              to={item.url}
            >
              <Button
                text
                icon={item.icon}
                rounded
                // size="small"
                className={`p-2 rounded-full ${isActive(path) ? `bg-[var(--highlight-bg)]` : ''}`}
                label={isActive(path) ? t(translateKey, { ns: 'common' }) : ''}
              />
            </Link>
          )
        },
        )
      }
    </div>
  )
}

export default function NavigationBar() {
  return (
    <Toolbar
      className="rounded-none py-1 bg-white"
      center={<NavigationButtons model={menuList} />}
    />
  )
}
