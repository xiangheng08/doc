// Type definitions for css-color-function
// Project: https://github.com/ianstormtaylor/css-color-function
// Definitions by: xiangheng08

declare module 'css-color-function' {
  /**
   * AST node types
   */
  type NodeType =
    | 'function'
    | 'color'
    | 'modifier'
    | 'number';

  /**
   * AST node interface
   */
  interface Node {
    type: NodeType;
    name?: string;
    value?: string;
    arguments?: Node[];
  }

  /**
   * Parse a color function CSS string and return an AST.
   * @param string The color function string to parse
   */
  function parse(string: string): Node;

  /**
   * Convert a color function CSS string into an RGB color string.
   * @param string The color function string to convert
   */
  function convert(string: string): string;

  export { parse, convert };
}
