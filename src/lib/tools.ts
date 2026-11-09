export { getTools, getTool, type ToolMeta } from './tools-i18n';

/** @deprecated use getTools(locale) */
import { getTools as gt } from './tools-i18n';
export const TOOLS = gt('zh');
