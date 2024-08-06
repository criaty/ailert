import { extname, join, relative } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

const getSrcInputs = (dirname: string) => {
  return Object.fromEntries(
    glob
      .sync(join(dirname, 'src/**/*.{ts,tsx}'), {
        ignore: ['**/*.spec.{ts,tsx}'],
      })
      .map((file) => {
        // console.log(file);
        return [
          // The name of the entry point
          // src/lib/nested/foo.ts becomes lib/nested/foo
          relative(
            join(dirname, 'src'),
            file.slice(0, file.length - extname(file).length),
          ),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/src/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ];
      }),
  );
};

export default getSrcInputs;
