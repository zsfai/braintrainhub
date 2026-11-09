export type Locale = 'zh' | 'en' | 'es' | 'ja' | 'ko' | 'ru';

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
  directAnswerLabel: string;
  skipToContent: string;
  menu: string;
  footerFaq: string;
  footerAboutLink: string;
  footerTools: string;
  footerPlans: string;
  navAbout: string;
  kindPrinciples: string;
  kindMethods: string;
  kindPlans: string;
  kindTools: string;
  toolHowTo: string;
  toolPrinciple: string;
  toolMethod: string;
  toolPlan: string;
  viewAllPrinciples: string;
  viewAllFaq: string;
  relatedToolsTitle: string;
  updatedOn: string;
  home: {
    heroLead: string;
    sectionTrain: string;
    sectionTrainLead: string;
    sectionPrinciples: string;
    sectionPrinciplesLead: string;
    sectionPlans: string;
    sectionPlansLead: string;
    sectionFaq: string;
    methodsLink: string;
    aboutLink: string;
    faqLink: string;
    directAnswer: string;
    metaDescription: string;
    title: string;
  };
  about: {
    title: string;
    metaDescription: string;
    directAnswer: string;
    weDo: string;
    weDont: string;
    principles: string;
    weDoItems: string[];
    weDontItems: string[];
    principlesBody: string;
  };
  faq: {
    title: string;
    metaDescription: string;
    directAnswer: string;
  };
  toolsIndex: {
    title: string;
    metaDescription: string;
    lead: string;
  };
  notFound: {
    title: string;
    description: string;
    heading: string;
    try: string;
    home: string;
  };
  disclaimer: {
    label: string;
    scope: string;
    help: string;
    helpPrefix: string;
  };
};
