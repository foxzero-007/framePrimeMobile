import fs from 'fs';
import less from 'less';
import postcss from 'postcss';
import { camelCase } from 'lodash';
import cssToReactNative, { Style } from 'css-to-react-native';

export async function compileLess(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const outFile = filePath.replace(/\.less$/, '.rnstyle.js');
  try {
    const output = await less.render(fileContent);
    const rootAst = postcss.parse(output.css);

    const styleObject: Record<string, Style> = {};

    rootAst.walkRules(rule => {
      const match = rule.selector.match(/^\.(\w[\w-]*)$/);
      if (!match) {
        console.warn(`⚠️ 忽略不支持的选择器: ${rule.selector}`);
        return;
      }
      const className = match[1];
      const declarations: [string, string][] = [];

      rule.walkDecls(decl => {
        declarations.push([decl.prop, decl.value]);
      });
      try {
        styleObject[camelCase(className)] = cssToReactNative(declarations);
      } catch (err) {
        console.error(`⚠️ 转换 ${className} 失败，检查 CSS 语法：`, err);
      }
    });
    const styleContent = JSON.stringify(styleObject, null, 2);
    const finalContent = `
import { StyleSheet } from 'react-native';

export default StyleSheet.create(${styleContent});
    `;
    fs.writeFileSync(outFile, finalContent, 'utf-8');
    console.log(`✅ 已生成: ${outFile}`);
  } catch (err) {
    console.error(`❌ 编译失败: ${filePath}`, err);
  }
}
