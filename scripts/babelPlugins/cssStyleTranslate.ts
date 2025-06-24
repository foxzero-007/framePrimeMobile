import { PluginObj } from '@babel/core';
import * as t from '@babel/types';
import { Expression } from '@babel/types';

const styleName = 'styles'; // 你想用的变量名
const styleIdentifier = t.identifier(styleName);

export default function styleNamePlugin(): PluginObj {
  return {
    name: 'babel-style-name-trans-plugin',
    visitor: {
      Program(path) {
        let hasStyleImport = false;

        path.traverse({
          ImportDeclaration(importPath) {
            const source = importPath.node.source.value;
            if (source.endsWith('.less')) {
              // 替换 import 语句
              importPath.replaceWith(
                t.importDeclaration(
                  [t.importDefaultSpecifier(styleIdentifier)],
                  t.stringLiteral(source.replace(/\.less$/, '.rnstyle.js')),
                ),
              );

              hasStyleImport = true;
            }
          },
        });

        if (hasStyleImport) {
          path.traverse({
            JSXAttribute(path) {
              if (!t.isJSXIdentifier(path.node.name, { name: 'styleName' }))
                return;
              const valueNode = path.node.value;
              if (!valueNode || !t.isStringLiteral(valueNode)) return;
              const styleNames = valueNode.value.split(/\s+/).filter(Boolean);
              if (!styleNames.length) {
                path.remove();
                return;
              }

              const jsxElem = path.findParent(p => p.isJSXOpeningElement());
              if (!jsxElem?.isJSXOpeningElement()) {
                return;
              }
              const existingStyleAttr = jsxElem
                .get('attributes')
                .find(
                  attr =>
                    attr.isJSXAttribute() &&
                    t.isJSXIdentifier(attr.node.name, { name: 'style' }),
                );

              const styleExpressions = styleNames.map(name =>
                t.memberExpression(t.identifier('styles'), t.identifier(name)),
              );

              if (existingStyleAttr?.isJSXAttribute()) {
                const styleValue = existingStyleAttr.node.value;
                if (t.isJSXExpressionContainer(styleValue)) {
                  existingStyleAttr.node.value = t.jsxExpressionContainer(
                    t.arrayExpression([
                      ...styleExpressions,
                      styleValue.expression as Expression,
                    ]),
                  );
                }
              } else {
                jsxElem.pushContainer(
                  'attributes',
                  t.jsxAttribute(
                    t.jsxIdentifier('style'),
                    t.jsxExpressionContainer(
                      styleExpressions.length === 1
                        ? styleExpressions[0]
                        : t.arrayExpression(styleExpressions),
                    ),
                  ),
                );
              }
              path.remove();
            },
          });
        }
      },
    },
  };
}
