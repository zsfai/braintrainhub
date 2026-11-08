export type Locale = 'zh';

export type NavItem = {
  href: string;
  label: string;
};

export type UiDict = {
  siteName: string;
  tagline: string;
  nav: NavItem[];
  ctaTrain: string;
  ctaPrinciples: string;
  footerAbout: string;
  breadcrumbHome: string;
  level: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  related: string;
  startTraining: string;
  bestScore: string;
  lastScore: string;
  reset: string;
  start: string;
  pause: string;
  resume: string;
  next: string;
  correct: string;
  wrong: string;
  ready: string;
  round: string;
  time: string;
  accuracy: string;
  settings: string;
};
