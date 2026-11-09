import { pageLocaleFromDocument } from '../../i18n/locale-dom';
import { getToolMessages } from '../../i18n/tool-messages';

export function renderSessionList(container: HTMLElement, lines: string[]): void {
  if (!lines.length) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  container.innerHTML = '';
  const title = document.createElement('p');
  title.className = 'tool-sessions__title';
  title.textContent = getToolMessages(pageLocaleFromDocument()).recentSessions;
  container.appendChild(title);
  const ul = document.createElement('ul');
  ul.className = 'tool-sessions__list';
  lines.forEach((line) => {
    const li = document.createElement('li');
    li.textContent = line;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}
