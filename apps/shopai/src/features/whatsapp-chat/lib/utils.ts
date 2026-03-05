export function interpolateTemplateText(template: string, args: string[] = []) {
  // WhatsApp-style placeholders are 1-indexed: {{1}}, {{2}}, ...
  return template.replace(/\{\{(\d+)\}\}/g, (_match, indexStr: string) => {
    const index = Number(indexStr);
    if (!Number.isFinite(index) || index <= 0) return '';
    return args[index - 1] ?? '';
  });
}
