/* eslint-disable operator-linebreak */
export type TemplateElement = {
  block: string;
  cls?: string;
  attrs?: { [key: string]: string };
  content?:
    | undefined
    | null
    | boolean
    | string
    | number
    | TemplateElement
    | TemplateElement[];
};

export type TemplateBlock =
  | undefined
  | null
  | boolean
  | string
  | number
  | TemplateElement
  | TemplateElement[];

export function templateEngine(blockObject: TemplateBlock): any {
  if (
    blockObject === undefined ||
    blockObject === null ||
    blockObject === false
  ) {
    return document.createTextNode('');
  }

  if (
    typeof blockObject === 'string' ||
    typeof blockObject === 'number' ||
    blockObject === true
  ) {
    return document.createTextNode(String(blockObject));
  }

  if (Array.isArray(blockObject)) {
    const fragment = document.createDocumentFragment();

    blockObject.forEach((contentItem) => {
      const el = templateEngine(contentItem);

      fragment.appendChild(el);
    });

    return fragment;
  }

  const element = document.createElement(blockObject.block);

  ['']
    .concat(blockObject.cls ?? '')
    .filter(Boolean)
    .forEach((className) => element.classList.add(className));

  if (blockObject.attrs) {
    Object.keys(blockObject.attrs).forEach((key) => {
      if (blockObject.attrs) element.setAttribute(key, blockObject.attrs[key]);
    });
  }

  element.appendChild(templateEngine(blockObject.content));

  return element;
}
