import chokidar from 'chokidar';
import { compileLess } from './tools/compileLess.ts';
import path from 'path';
const watchDir = path.resolve(__dirname, '../src'); // 你项目的源码目录

console.log(
  `👀 正在监听 ${watchDir}/**/**/*.less下的 .less 文件...`,
  compileLess,
);

chokidar
  .watch(`${watchDir}`, {
    ignoreInitial: false,
    ignored: (path, stats) => !!(stats?.isFile() && !path.endsWith('.less')),
  })
  .on('ready', () => {
    console.log('succcess');
  })
  .on('add', compileLess)
  .on('change', compileLess);
