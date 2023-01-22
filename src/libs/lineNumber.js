const numberStyle = ['margin: 0 20px 0 10px', 'float: right', 'color: #7f7f7f'].join(';');
const basicStyle = ['border: none', 'margin: 0', 'padding: 0', 'background-color: #00000000'].join(';');

const getLinesCount = (text) => (text.trim().match(/\r\n|\r|\n/g) || []).length;

const getLines = (text, trim) => {
  const lines = text.length === 0 ? [] : text.split(/\r\n|\r|\n/g);
  trim && lines[lines.length - 1].trim() === '' && lines.pop();
  return lines;
};

const duplicateMultilineNodes = (element) => {
  const nodes = element.childNodes;
  for (const node in nodes) {
    // eslint-disable-next-line no-prototype-builtins
    if (nodes.hasOwnProperty(node)) {
      const child = nodes[node];
      if (getLinesCount(child.textContent) > 0) {
        if (child.childNodes.length > 0) {
          duplicateMultilineNodes(child);
        } else {
          duplicateMultilineNode(child.parentNode);
        }
      }
    }
  }
};

const duplicateMultilineNode = (element) => {
  if (/hljs-/.test(element.className)) {
    const result = getLines(element.innerHTML).map((i) => {
      const lineText = i.length > 0 ? i : '\n';
      return `<span class="${element.className}">${lineText}</span>`;
    });
    element.innerHTML = result.join('\n').trim();
  }
};

const addLineNumbersBlockFor = (inputHtml, options = {}) => {
  let index = options.startFrom || 1;
  const html = getLines(inputHtml, true).map((i) => {
    const number = `<span style="${numberStyle}" class="hljs-blob-num" data-line-number="${index++}">`;
    const left = `<td style="${basicStyle}">${number}</td>`;
    const right = `<td style="${basicStyle}">${i.length > 0 ? i : '\n'}</td>`;
    return `<tr style="${basicStyle}">${left + right}</tr>`;
  });
  return `<table style="${basicStyle}"><tbody>${html.join('\n').trim()}</tbody></table>`;
};

export const lineNumbersBlock = (element, options) => {
  if (typeof element === 'object') {
    duplicateMultilineNodes(element);
    element.innerHTML = addLineNumbersBlockFor(element.innerHTML, options);
  }
};
