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


function getIdentifier(statement) {
  return statement
    .body
    .statements[2]
    .expression
    .arguments[0]
    .body
    .statements[1]
    .expression
}


////
//// WORKING CASE
////

// this will pick the `toPart` identifier on line 6
const nodeWorking = getIdentifier(sourceFile.statements[0]);
const typeWorking = checker.getTypeAtLocation(nodeWorking);
console.log(
  'working case:',
  checker.typeToString(typeWorking),
);



////
//// BROKEN CASE
////

// this will pick the `toPart` identifier on line 16
const nodeBroken = getIdentifier(sourceFile.statements[1]);
const typeBroken = checker.getTypeAtLocation(nodeBroken);
// it *should* print `number`, but it prints `any`
console.log(
  'broken case:',
  checker.typeToString(typeBroken),
);
