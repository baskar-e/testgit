'use client'

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  startLineNumber?: number;
  highlightLines?: number[];
  className?: string;
  title?: string;
  showCopy?: boolean;
}

function highlightCode(code: string, language: string): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, index) => {
    // Tokenize the line
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    // Keywords
    const keywords = /\b(import|from|const|let|var|function|return|if|else|for|while|class|extends|interface|type|export|default|async|await|try|catch|throw|new)\b/g;

    // Strings
    const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;

    // Comments
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/g;

    // Numbers
    const numbers = /\b(\d+\.?\d*)\b/g;

    // Functions
    const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;

    // JSX/HTML tags
    const jsxTags = /(<\/?[a-zA-Z][a-zA-Z0-9]*)/g;
    const jsxProps = /\s([a-zA-Z][a-zA-Z0-9-]*)(=)/g;

    // Operators
    const operators = /([+\-*/%=<>!&|^~?:;,.])/g;

    // Brackets
    const brackets = /([{}[\]()])/g;

    // Process line character by character with proper highlighting
    let processed = '';
    let i = 0;

    while (i < line.length) {
      const rest = line.slice(i);

      // Check for comment
      if (rest.startsWith('//')) {
        tokens.push(
          <span key={key++} className="text-gray-500">
            {rest}
          </span>
        );
        break;
      }

      // Check for string
      const stringMatch = rest.match(/^(["'`])/);
      if (stringMatch) {
        const quote = stringMatch[1];
        let endIndex = 1;
        let escaped = false;

        while (endIndex < rest.length) {
          if (rest[endIndex] === '\\') {
            escaped = !escaped;
          } else if (rest[endIndex] === quote && !escaped) {
            endIndex++;
            break;
          } else {
            escaped = false;
          }
          endIndex++;
        }

        tokens.push(
          <span key={key++} className="text-green-400">
            {rest.slice(0, endIndex)}
          </span>
        );
        i += endIndex;
        continue;
      }

      // Check for number
      const numberMatch = rest.match(/^\d+\.?\d*/);
      if (numberMatch) {
        tokens.push(
          <span key={key++} className="text-orange-400">
            {numberMatch[0]}
          </span>
        );
        i += numberMatch[0].length;
        continue;
      }

      // Check for keyword
      const keywordMatch = rest.match(/^(import|from|const|let|var|function|return|if|else|for|while|class|extends|interface|type|export|default|async|await|try|catch|throw|new)\b/);
      if (keywordMatch) {
        tokens.push(
          <span key={key++} className="text-purple-800 dark:text-purple-400">
            {keywordMatch[0]}
          </span>
        );
        i += keywordMatch[0].length;
        continue;
      }

      // Check for JSX/HTML tag
      const tagMatch = rest.match(/^<\/?[a-zA-Z][a-zA-Z0-9]*/);
      if (tagMatch) {
        tokens.push(
          <span key={key++} className="text-blue-400">
            {tagMatch[0]}
          </span>
        );
        i += tagMatch[0].length;
        continue;
      }

      // Check for function name
      const funcMatch = rest.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/);
      if (funcMatch) {
        tokens.push(
          <span key={key++} className="text-yellow-400">
            {funcMatch[1]}
          </span>
        );
        i += funcMatch[1].length;
        continue;
      }

      // Check for brackets
      if (/[{}[\]()]/.test(rest[0])) {
        tokens.push(
          <span key={key++} className="text-yellow-300">
            {rest[0]}
          </span>
        );
        i++;
        continue;
      }

      // Check for operators
      if (/[+\-*/%=<>!&|^~?:;,.]/.test(rest[0])) {
        tokens.push(
          <span key={key++} className="text-cyan-400">
            {rest[0]}
          </span>
        );
        i++;
        continue;
      }

      // Regular text
      tokens.push(
        <span key={key++} className="text-slate-800 dark:text-slate-300">
          {rest[0]}
        </span>
      );
      i++;
    }

    return tokens.length > 0 ? tokens : <span className="text-slate-300">{line || '\u00A0'}</span>;
  });
}

export function CodeBlock({
  code,
  language = 'text',
  showLineNumbers = true,
  startLineNumber = 1,
  highlightLines = [],
  className,
  title,
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');
  const highlightedLines = highlightCode(code, language);

  const totalLines = lines.length + startLineNumber - 1;
  const lineNumberWidth = totalLines.toString().length;

  const styles = {
    "backgroundColor": '#E4E4E1',
    "backgroundImage": "radial-gradient(at top center, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0.03) 100%), linear-gradient(to top, rgba(255, 255, 255, 0.1) 0%, rgba(143, 152, 157, 0.60) 100%)",
    "backgroundBlendMode": 'normal, multiply'
  }
  // bg-linear-[to_top,#dfe9f3_0%,white_100%]  /  bg-linear-[120deg,#fdfbfb_0%,#ebedee_100%]
  return (
    <div className={cn('relative rounded-lg overflow-hidden bg-linear-[to_top,#dfe9f3_0%,white_100%] shadow-md dark:border dark:border-slate-700', className)}
    //  style={styles}
    >
      {/* Header */}
      {(title || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2 dark:bg-[#252526] dark:border-b dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-300">{title || 'Usage'}</h3>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-slate-700 rounded transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          )}
        </div>
      )}

      <div className="p-4 pt-0 overflow-auto custom-scrollbar">
        <pre className="m-0 text-sm font-mono [counter-reset:line]">
          <code>
            {lines.map((_, index) => {
              const lineNumber = startLineNumber + index;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    isHighlighted && 'bg-slate-700/30'
                  )}
                >

                  {/* Line Number */}
                  {showLineNumbers && (
                    <span
                      className="select-none text-slate-600 mr-6 text-right shrink-0"
                      style={{
                        minWidth: `${lineNumberWidth}ch`,
                        width: `${lineNumberWidth}ch`,
                      }}
                    >
                      {lineNumber}
                    </span>
                  )}

                  <span className="">
                    {highlightedLines[index]}
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
