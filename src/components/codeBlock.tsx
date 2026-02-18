// 'use client'

import { Fragment } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Token types for syntax highlighting
export type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'function'
  | 'tag'
  | 'prop'
  | 'operator'
  | 'bracket'
  | 'comment'
  | 'text';

// Color mapping for token types
const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: 'text-red-700 dark:text-purple-400',
  string: 'text-green-700 dark:text-green-400',
  number: 'text-orange-400',
  function: 'text-yellow-600 dark:text-rose-400',
  tag: 'text-blue-800 dark:text-blue-400',
  prop: 'text-violet-600 dark:text-cyan-300',
  operator: 'text-cyan-700 dark:text-cyan-400',
  bracket: 'text-purple-700 dark:text-amber-400',
  comment: 'text-gray-500',
  text: 'text-slate-700 dark:text-slate-300',
};

interface CodeLine {
  word?: Word;
  level?: CodeLine[];
  indent?: number;
}

interface CodeBlockProps {
  data: CodeLine[];
  highlightLines?: number[];
  className?: string;
  title?: string;
  showCopy?: boolean;
  autoIndent?: boolean;
  indentSize?: number;
}

interface Token {
  type: TokenType;
  value: string;
  space?: boolean
}

// Flexible word structure - can have multiple token types in one object
type Word = Partial<Record<TokenType, string>> & { space?: boolean } | Token[];

function wordToTokens(word: Word): Token[] {
  if (Array.isArray(word)) {
    return word;
  }
  const { space = true, ...tokensOnly } = word;
  // Convert object to array of tokens
  return Object.entries(tokensOnly).map(([type, value]) => ({
    type: type as TokenType,
    value: value as string,
    space: space
  }));
}

export function CodeBlock({
  data,
  highlightLines = [],
  className,
  title,
  showCopy = true,
  autoIndent = true,
  indentSize = 2,
}: CodeBlockProps) {
  // const [copied, setCopied] = useState(false);

  // Flatten nested structure into lines with calculated indentation
  const flattenLines = (
    items: CodeLine[],
    currentIndent: number = 0,
  ): Array<{ word: Word; indent: number }> => {
    const result: Array<{ word: Word; indent: number }> = [];

    items.forEach((item) => {
      // Add the current item's word if it exists
      if (item.word) {
        result.push({
          word: item.word,
          indent: item.indent !== undefined ? item.indent : (autoIndent ? currentIndent : 0),
        });
      }

      // Recursively process nested levels
      if (item.level && item.level.length > 0) {
        const nestedLines = flattenLines(item.level, currentIndent + indentSize);
        result.push(...nestedLines);
      }
    });

    return result;
  };

  const lines = flattenLines(data);

  // Convert to plain text for copying
  const plainText = lines
    .map(({ word, indent }) => {
      const tokens = wordToTokens(word);
      const text = tokens.map(t => t.value).join('');
      return ' '.repeat(indent) + text;
    })
    .join('\n');

  // const handleCopy = async () => {
  //   await navigator.clipboard.writeText(plainText);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

  return (
    <div className={cn('relative rounded-lg overflow-hidden bg-linear-[to_top,#dfe9f3_0%,white_100%] dark:bg-linear-[to_top,#2e3030_0%,#141414_100%] shadow-md dark:border border-slate-700', className)}>
      {/* Header */}
      {title && (
        <div className="flex items-center px-4 py-2 border-b border-slate-300 dark:border-slate-700">
          <h3 className="text-sm font-medium dark:text-slate-300">{title}</h3>
        </div>
      )}

      {/* Copy */}
      {showCopy && (
        <button
          className="absolute top-1 left-full -translate-x-8 p-1.5 rounded-md backdrop-blur-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
          aria-label="Copy code"
        // onClick={handleCopy}
        >
          <Copy className="w-4 h-4 text-slate-400" />
          {/* {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
          )} */}
        </button>
      )}

      {/* Code */}
      <div className="p-3">
        <pre className="text-sm font-mono overflow-auto custom-scrollbar [counter-reset:line] max-h-71">
          <code>
            {lines.map((line, index) => {
              const isHighlighted = highlightLines.includes(index);
              const tokens = wordToTokens(line.word);

              return (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    isHighlighted && 'bg-slate-700/30'
                  )}
                >
                  {/* Code Line with Tokens */}
                  <span className="whitespace-pre [counter-increment:line] before:content-[counter(line)] before:inline-block before:mr-3 before:pl-2 before:pr-4 before:py-1 before:h-full before:text-slate-500 dark:before:text-slate-600">
                    {line.indent > 0 && <span>{' '.repeat(line.indent)}</span>}
                    {tokens.map((token, tokenIndex) => (
                      <Fragment key={tokenIndex}>
                        <span className={TOKEN_COLORS[token.type]}>
                          {token.value}
                        </span>
                        {/* Add space between tokens except last one */}
                        {tokenIndex < tokens.length - 1 && token?.space && ' '}
                      </Fragment>
                    ))}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}

export const t = (type: TokenType, value: string, space: boolean = true): Token => ({ type, value, space });