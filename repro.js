// @ts-check
const path = require('path');
const ts = require('typescript');

const testFilePath = path.resolve(process.cwd(), 'file.tsx');
const program = ts.createProgram({
  rootNames: [testFilePath],
  options: {
    target: ts.ScriptTarget.ESNext,
    strict: true,
  }
});

const sourceFile = program.getSourceFile(testFilePath);
const checker = program.getTypeChecker();

////
//// WORKING CASE
////

// this will pick the `toPart` identifier on line 22
const nodeWorking = sourceFile
  .statements[1]
  // @ts-expect-error -- too lazy to refine properly
  .body
  .statements[2]
  .expression
  .arguments[0]
  .body
  .statements[1]
  .expression;
const typeWorking = checker.getTypeAtLocation(nodeWorking);
console.log(
  'working case:',
  checker.typeToString(typeWorking),
);



////
//// BROKEN CASE
////

// this will pick the `toPart` identifier on line 10
const nodeBroken = sourceFile
  .statements[0]
  // @ts-expect-error -- too lazy to refine properly
  .body
  .statements[2]
  .expression
  .arguments[0]
  .body
  .statements[1]
  .expression;
const typeBroken = checker.getTypeAtLocation(nodeBroken);
// it *should* print `number`, but it prints `any`
console.log(
  'broken case:',
  checker.typeToString(typeBroken),
);
