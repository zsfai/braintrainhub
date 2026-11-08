import { howToSchema } from './seo-schemas';
import { webApplicationSchema } from '../utils/site';

export function toolSchemas(opts: {
  toolName: string;
  url: string;
  description: string;
  tips: string[];
}) {
  return [
    webApplicationSchema({
      name: opts.toolName,
      url: opts.url,
      description: opts.description,
    }),
    howToSchema({
      name: `如何使用${opts.toolName}`,
      description: opts.description,
      steps: opts.tips.map((text, index) => ({
        name: `步骤 ${index + 1}`,
        text,
      })),
    }),
  ];
}

export function toolBreadcrumbs(toolTitle: string, toolPath: string) {
  return [
    { name: '首页', path: '/' },
    { name: '训练工具', path: '/tools/' },
    { name: toolTitle, path: toolPath },
  ];
}
