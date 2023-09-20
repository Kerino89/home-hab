export interface NavItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

export interface BaseLayoutProps extends React.PropsWithChildren {
  navList?: Array<NavItem>;
}
