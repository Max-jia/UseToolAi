import React from "react";

export default function MarkdownContent({ content }: { content: string }) {
  // Simple markdown renderer: paragraphs, bold, links, lists
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-semibold text-base mt-4 mb-2">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-bold text-lg mt-5 mb-2">
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Unordered list items
    if (line.match(/^[-*]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        items.push(lines[i].replace(/^[-*]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc pl-5 space-y-1 my-2 text-[var(--color-text-muted)]">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed">{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered lists
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal pl-5 space-y-1 my-2 text-[var(--color-text-muted)]">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed">{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Markdown table: starts with | and second line is separator like |---|---|
    if (line.startsWith("|") && i + 2 < lines.length && lines[i + 1]?.match(/^\|[\s\-:|]+\|$/)) {
      const headerLine = line;
      const bodyLines: string[] = [];
      i += 2; // skip separator
      while (i < lines.length && lines[i].startsWith("|")) {
        bodyLines.push(lines[i]);
        i++;
      }
      const parseRow = (row: string) =>
        row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
      const headers = parseRow(headerLine);

      elements.push(
        <div key={i} className="overflow-x-auto my-4 rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                {headers.map((h, j) => (
                  <th key={j} className="text-left p-3 font-semibold text-[var(--color-text)]">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyLines.map((row, ri) => (
                <tr key={ri} className="border-b border-[var(--color-border)] last:border-0">
                  {parseRow(row).map((cell, ci) => (
                    <td key={ci} className="p-3 text-[var(--color-text-muted)]">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-[var(--color-text-muted)] leading-relaxed mb-3 text-sm">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  // Bold: **text**
  // Links: [text](url)
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}
