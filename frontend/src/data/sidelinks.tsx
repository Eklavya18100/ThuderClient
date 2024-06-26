import { IconFileStack, IconLayoutDashboard } from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Assignments',
    label: '',
    href: '/assignments',
    icon: <IconFileStack size={18} />,
  },
  {
    title: 'Notes',
    label: '3',
    href: '/notes',
    icon: <IconFileStack size={18} />,
  },
  /* {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  }, */
]
