import './index.scss';
import readXlsxFile from 'read-excel-file';
// let readXlsxFile = require('read-excel-file')
const inputBar = document.querySelector('.container');

function createBlock(
  targetSelector: string,
  blockTag: string,
  blockClass: string,
  blockId: string,
  blockInnerHTML: string,
  blockWidth: string,
  blockHeight: string
) {
  const target = document.querySelector(`${targetSelector}`);

  const newBlock = document.createElement(`${blockTag}`);
  if (blockClass) {
    newBlock.classList.add(`${blockClass}`);
  }
  if (blockId) {
    newBlock.setAttribute('id', `${blockId}`);
  }
  if (blockInnerHTML) {
    newBlock.innerHTML = blockInnerHTML;
  }
  if (blockWidth) {
    newBlock.style.width = blockWidth + 'px';
  }
  if (blockHeight) {
    newBlock.style.height = blockHeight + 'px';
  }

  target?.append(newBlock);
}

function readFile() {
  const file = (<HTMLInputElement>document.querySelector('#input')).files;

  readXlsxFile(file![0]).then((data) => {
    const cellWidth = 800 / data[0].length;
    const cellHeight = 800 / data.length;

    createBlock('.container', 'div', 'xlsxContainer', '', '', '', '');

    for (let i = 0; i < data.length; i++) {
      createBlock(
        '.xlsxContainer',
        'div',
        'row',
        `rowID${i}`,
        '',
        '',
        `${cellHeight}`
      );
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] != null) {
          createBlock(
            `#rowID${i}`,
            'div',
            'block',
            '',
            `${data[i][j]}`,
            `${cellWidth}`,
            `${cellHeight}`
          );
        } else {
          createBlock(
            `#rowID${i}`,
            'div',
            'block',
            '',
            '',
            `${cellWidth}`,
            `${cellHeight}`
          );
        }
      }
    }
  });
}

inputBar?.addEventListener('change', readFile);
