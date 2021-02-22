import { LoaderSync } from 'cosmiconfig';
import get from 'lodash.get';
import { register, RegisterOptions } from 'ts-node';

import TypeScriptCompileError from './Errors/TypeScriptCompileError';

const loader: (options?: RegisterOptions) => LoaderSync = (options?: RegisterOptions) => {
  return (filePath: string, content: string) => {
    try {
      register(options).compile(content, filePath);
      const result = require(filePath);
      return get(result, 'default', result);
    } catch (error) {
      // Replace with logger class OR throw a more specific error
      throw TypeScriptCompileError.fromError(error);
    }
  };
};

export default loader;
