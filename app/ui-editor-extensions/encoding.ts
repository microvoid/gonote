/**
 * @module
 *
 * Use `turndown` to provide a github flavoured markdown converter and the
 * default common mark converter.
 */
import _TurndownService from "turndown";
import {
  defaultImport,
  ErrorConstant,
  invariant,
  isElementDomNode,
} from "@remirror/core";
import { marked } from "marked";

export const Encoding = {
  htmlToMarkdown,
  markdownToHtml,
};

marked.use({
  renderer: {
    list(body: string, isOrdered: boolean, start: number): string {
      if (isOrdered) {
        const startAttr = start !== 1 ? `start="${start}"` : "";
        return `<ol ${startAttr}>\n${body}</ol>\n`;
      }

      const taskListAttr = body.startsWith("<li data-task-list-item ")
        ? "data-task-list"
        : "";
      return `<ul ${taskListAttr}>\n${body}</ul>\n`;
    },
    listitem(text: string, isTask: boolean, isChecked: boolean): string {
      if (!isTask) {
        return `<li>${text}</li>\n`;
      }

      const checkedAttr = isChecked ? "data-checked" : "";
      return `<li data-task-list-item ${checkedAttr}>${text}</li>\n`;
    },
  },
});

export function markdownToHtml(
  markdown: string,
  sanitizer?: (html: string) => string
): string {
  return marked(markdown, {
    gfm: true,
    smartLists: true,
    xhtml: true,
    sanitizer,
  } as marked.MarkedOptions);
}

const TurndownService = defaultImport(_TurndownService);

/**
 * Converts the provide HTML to markdown.
 */
export function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html);
}

/**
 * A tableRow is a heading row if:
 * - the parent is a THEAD
 * - or if its the first child of the TABLE or the first TBODY (possibly
 *   following a blank THEAD)
 * - and every cell is a TH
 */
function isHeadingRow(tableRow: Node): tableRow is HTMLTableRowElement {
  const parentNode = tableRow.parentNode;

  if (!isElementDomNode(parentNode)) {
    return false;
  }

  if (parentNode.nodeName === "THEAD") {
    return true;
  }

  if (parentNode.nodeName !== "TABLE" && !isFirstTbody(parentNode)) {
    return false;
  }

  const childNodes = [...tableRow.childNodes];
  return (
    childNodes.every(n => n.nodeName === "TH") &&
    childNodes.some(n => !!n.textContent)
  );
}

/**
 * Controller cells are generated by the React Tables extension, and provide Node Views for adding/removing columns and rows
 *
 * However they should not be included in markdown output.
 */
function isControllerHeadingCell(cell: unknown): cell is HTMLTableCellElement {
  return isElementDomNode(cell) && cell.matches("th[data-controller-cell]");
}

/**
 * A tableRow is a controller heading row if:
 * - the parent is a THEAD
 * - or if its the first child of the TABLE or the first TBODY (possibly
 *   following a blank THEAD)
 * - and every cell is a controller cell
 */
function isControllerHeadingRow(
  tableRow: Node
): tableRow is HTMLTableRowElement {
  const parentNode = tableRow.parentNode;

  if (!isElementDomNode(parentNode)) {
    return false;
  }

  if (parentNode.nodeName !== "TABLE" && !isFirstTbody(parentNode)) {
    return false;
  }

  const childNodes = [...tableRow.childNodes];
  return childNodes.every(n => isControllerHeadingCell(n));
}

/**
 * Check whether this is the first `tbody` in the table.
 */
function isFirstTbody(element: Node): element is HTMLTableSectionElement {
  if (element.nodeName !== "TBODY") {
    return false;
  }

  const previousSibling = element.previousSibling;

  if (!previousSibling) {
    return true;
  }

  return (
    isElementDomNode(previousSibling) &&
    previousSibling.nodeName === "THEAD" &&
    !previousSibling.textContent?.trim()
  );
}

/**
 * Markdown does not support nested tables, check if current table has a table ancestor node
 */
function isNestedTable(element: HTMLElement): boolean {
  const currentTable = element.closest("table");

  if (!currentTable) {
    return false;
  }

  const { parentNode } = currentTable;

  if (!parentNode) {
    return true;
  }

  return !!(parentNode as HTMLElement).closest("table");
}

/**
 * Create a cell from the table.
 */
function cell(content: string, node: Node) {
  const childNodes = [];

  for (const n of node.parentNode?.childNodes ?? []) {
    if (isControllerHeadingCell(n)) {
      continue;
    }

    childNodes.push(n);
  }

  const index = childNodes.indexOf(node as ChildNode);
  const prefix = index === 0 ? "| " : " ";

  return `${prefix + content.trim()} |`;
}

/**
 * Create the turndown service which will be used to convert html to markdown.
 *
 * This supports html by default.
 */
const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
  headingStyle: "atx",
})
  .addRule("taskListItems", {
    filter: node => {
      return node.nodeName === "LI" && node.hasAttribute("data-task-list-item");
    },
    replacement: (content, node) => {
      const isChecked = (node as HTMLElement).hasAttribute("data-checked");
      return `- ${isChecked ? "[x]" : "[ ]"} ${content.trimStart()}`;
    },
  })
  .addRule("tableCell", {
    filter: ["th", "td"],
    replacement: (content, node) => {
      if (isControllerHeadingCell(node)) {
        return "";
      }

      return cell(content, node as ChildNode);
    },
  })
  .addRule("tableRow", {
    filter: "tr",
    replacement: (content, node) => {
      let borderCells = "";
      const alignMap = { left: ":--", right: "--:", center: ":-:" };

      // Get child nodes ignoring controller cells
      const childNodes = [...node.childNodes].filter(
        n => !isControllerHeadingCell(n)
      );

      if (isHeadingRow(node)) {
        for (const childNode of childNodes) {
          if (!isElementDomNode(childNode)) {
            // This should never happen.
            continue;
          }

          let border = "---";
          const align = (
            childNode.getAttribute("align") ?? ""
          ).toLowerCase() as keyof typeof alignMap;

          if (align) {
            border = alignMap[align] || border;
          }

          borderCells += cell(border, childNode);
        }
      }

      return `\n${content}${borderCells ? `\n${borderCells}` : ""}`;
    },
  })
  .addRule("table", {
    // Only convert tables with a heading row. Tables with no heading row are kept
    // using `keep` (see below).
    filter: node => {
      if (node.nodeName !== "TABLE") {
        return false;
      }

      if (isNestedTable(node)) {
        return false;
      }

      // eslint-disable-next-line unicorn/prefer-array-find
      const rows = [...(node as HTMLTableElement).rows].filter(r => {
        // Remove controller rows
        return !isControllerHeadingRow(r);
      });

      return isHeadingRow(rows[0]);
    },

    replacement: content => {
      // Ensure there are no blank lines
      content = content.replace("\n\n", "\n");
      return `\n\n${content}\n\n`;
    },
  })
  .addRule("tableSection", {
    filter: ["thead", "tbody", "tfoot"],
    replacement: function (content) {
      return content;
    },
  })
  .keep(node => {
    return (
      node.nodeName === "TABLE" &&
      !isHeadingRow((node as HTMLTableElement).rows[0] as any)
    );
  })
  .keep(node => {
    return node.nodeName === "TABLE" && isNestedTable(node);
  })
  .addRule("strikethrough", {
    filter: ["del", "s", "strike" as "del"],
    replacement: function (content) {
      return `~${content}~`;
    },
  })

  // Add improved code block support from html.
  .addRule("fencedCodeBlock", {
    filter: (node, options) => {
      return !!(
        options.codeBlockStyle === "fenced" &&
        node.nodeName === "PRE" &&
        node.firstChild &&
        node.firstChild.nodeName === "CODE"
      );
    },

    replacement: (_, node, options) => {
      invariant(isElementDomNode(node.firstChild), {
        code: ErrorConstant.EXTENSION,
        message: `Invalid node \`${node.firstChild?.nodeName}\` encountered for codeblock when converting html to markdown.`,
      });

      const className = node.firstChild.getAttribute("class") ?? "";
      const language =
        className.match(/(?:lang|language)-(\S+)/)?.[1] ??
        node.firstChild.getAttribute("data-code-block-language") ??
        "";

      return `\n\n${options.fence}${language}\n${node.firstChild.textContent}\n${options.fence}\n\n`;
    },
  });
