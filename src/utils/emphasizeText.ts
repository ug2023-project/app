interface EmphasizeText {
  text: string;
  bold: boolean;
}

function emphasizeText(inputString: string): EmphasizeText[] {
  const parts = inputString.split(/(<em>|<\/em>)/);
  const filtered = parts.filter((part) => part !== '');
  const result: EmphasizeText[] = [];
  let bold = false;
  filtered.forEach((part) => {
    if (part === '<em>') {
      bold = true;
    } else if (part === '</em>') {
      bold = false;
    } else {
      result.push({ text: part, bold });
    }
  });
  return result;
}

export { emphasizeText };
