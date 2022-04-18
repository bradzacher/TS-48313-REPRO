// @ts-check
const path = require('path');
const ts = require('typescript');

const testFilePath = path.resolve(process.cwd(), 'file.tsx');
const program = ts.createProgram({
  rootNames: [testFilePath],
  options: {
    "allowJs": true,
    "target": ts.ScriptTarget.ESNext,
    "strict": true,
  }
});

const sourceFile = program.getSourceFile(testFilePath);
const checker = program.getTypeChecker();

const node = sourceFile
  .statements[0]
  // @ts-expect-error -- too lazy to refine properly
  .body
  .statements[2]
  .expression
  .arguments[0]
  .body
  .statements[2]
  .thenStatement
  .statements[0]
  .expression;
const type = checker.getTypeAtLocation(node);
console.log(
  checker.typeToString(type)
);
