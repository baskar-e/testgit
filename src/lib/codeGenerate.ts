import { TokenType } from "../components/codeBlock";

const GRAMMAR: { type: TokenType; regex: RegExp }[] = [
  { type: 'comment', regex: /\/\/.*|\/\*[\s\S]*?\*\// },
  { type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[\s\S]*?`/ },
  { type: 'keyword', regex: /\b(export|import|const|let|var|function|return|if|else|for|while|type|interface|class|default|use client)\b/ },
  { type: 'tag', regex: /<\/?([a-zA-Z0-9]+)/ },
  { type: 'number', regex: /\b\d+(\.\d+)?\b/ },
  { type: 'operator', regex: /[+\-*/=<>!&|]+/ },
  { type: 'bracket', regex: /[{}()[\]]/ },
  { type: 'function', regex: /\b[a-zA-Z_]\w*(?=\s*\()/ },
];

type Token = Record<TokenType, string>[]

interface CodeLine {
    word: Token[]
}

export function parseRawCode(rawCode: string): Partial<Record<TokenType, string>>[] {
  return rawCode.split('\n').map((lineText) => {
    const wordObj: Partial<Record<TokenType, string>> = {};
    
    // Trim everything to ignore indentation/extra spaces
    let remaining = lineText.trim();

    while (remaining.length > 0) {
      let matched = false;

      for (const { type, regex } of GRAMMAR) {
        // Sticky match ('y') to find tokens at the start of the remaining string
        const matchRegex = new RegExp(regex.source, 'y');
        const match = matchRegex.exec(remaining);

        if (match) {
          const value = match[0];
          // If the key already exists (e.g. two keywords), append with a space
          wordObj[type] = wordObj[type] ? `${wordObj[type]} ${value}` : value;
          
          remaining = remaining.slice(value.length).trim();
          matched = true;
          break;
        }
      }

      if (!matched) {
        const nextSpace = remaining.indexOf(' ');
        const value = nextSpace === -1 ? remaining : remaining.slice(0, nextSpace);
        wordObj['text'] = wordObj['text'] ? `${wordObj['text']} ${value}` : value;
        remaining = remaining.slice(value.length).trim();
      }
    }

    return wordObj; // Returns only { bracket: '}', keyword: 'from', ... }
  });
}


