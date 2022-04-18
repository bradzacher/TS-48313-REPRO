// @ts-check
const {parseAndGenerateServices} = require('@typescript-eslint/typescript-estree');
const fs = require('fs');
const path = require('path');

const testFilePath = path.resolve(process.cwd(), 'file.tsx');
const {services: {program}} = parseAndGenerateServices(
  fs.readFileSync(testFilePath, 'utf8'),
  {
    filePath: testFilePath,
    loggerFn: false,
    project: path.resolve(process.cwd(), 'tsconfig.json'),
    tsconfigRootDir: process.cwd(),
  }
);

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
  .expression
const type = checker.getTypeAtLocation(node);
console.log(
  checker.typeToString(type)
);
