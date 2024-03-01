export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NAV_ITEMS = [
  {
    label: 'Europass',
    href: 'home',
    children: [{ label: 'Generate IT Europass', href: 'generate' }],
  },
  {
    label: 'Info',
    href: 'about',
    children: [{ label: 'About', href: 'about' }],
  },
];
