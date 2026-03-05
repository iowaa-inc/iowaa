import React from 'react';

type FormattedTextProps = {
  text: string;
};

/**
 * Minimal WhatsApp-ish formatter.
 * Supports:
 * - *bold*
 * - _italic_
 * - ~strikethrough~
 * - `inline code`
 * - ```code blocks```
 *
 * Notes:
 * - This is intentionally conservative (non-nested, non-overlapping).
 * - If you want true WA parity (nesting rules/escaping), we can extend it later.
 */
export function FormattedText({ text }: FormattedTextProps) {
  const nodes: React.ReactNode[] = [];
  let key = 0;

  // First handle triple-backtick code blocks (can include newlines).
  const parts = text.split(/```([\s\S]*?)```/g);
  for (let i = 0; i < parts.length; i++) {
    const isCodeBlock = i % 2 === 1;
    const part = parts[i] ?? '';
    if (!part) continue;

    if (isCodeBlock) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-black/5 px-1.5 py-1 font-mono text-[13px] whitespace-pre-wrap"
        >
          {part}
        </code>,
      );
      continue;
    }

    // Then handle inline code.
    const inlineParts = part.split(/`([^`]+)`/g);
    for (let j = 0; j < inlineParts.length; j++) {
      const isInlineCode = j % 2 === 1;
      const chunk = inlineParts[j] ?? '';
      if (!chunk) continue;

      if (isInlineCode) {
        nodes.push(
          <code key={key++} className="rounded bg-black/5 px-1 font-mono text-[13px]">
            {chunk}
          </code>,
        );
        continue;
      }

      // Finally handle *bold* _italic_ ~strike~ in remaining plain text.
      // Split while keeping delimiters.
      const fmtParts = chunk.split(/(\*[^*\n]+\*|_[^_\n]+_|~[^~\n]+~)/g);
      for (const token of fmtParts) {
        if (!token) continue;

        const first = token[0];
        const last = token[token.length - 1];
        const inner = token.slice(1, -1);

        if (first === '*' && last === '*' && inner) {
          nodes.push(<strong key={key++}>{inner}</strong>);
        } else if (first === '_' && last === '_' && inner) {
          nodes.push(<em key={key++}>{inner}</em>);
        } else if (first === '~' && last === '~' && inner) {
          nodes.push(<del key={key++}>{inner}</del>);
        } else {
          nodes.push(<React.Fragment key={key++}>{token}</React.Fragment>);
        }
      }
    }
  }

  return <>{nodes}</>;
}
