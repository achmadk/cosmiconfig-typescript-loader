import path from 'path';
import { cosmiconfig, cosmiconfigSync } from 'cosmiconfig';

import loader from '.';
import TypeScriptCompileError from './Errors/TypeScriptCompileError';

const FIXTURES_PATH = path.resolve(__dirname, '__fixtures__');

describe('TypeScriptLoader', () => {
  describe('via cosmiconfig API', () => {
    it('compiles a valid TypeScript file', async () => {
      try {
        const test = await cosmiconfig('test-success', {
          loaders: {
            '.ts': loader()
          }
        }).load(path.resolve(FIXTURES_PATH, 'test-success.config.ts'))
        expect(test?.config).toEqual({ foo: 'bar' });
      } catch (error) {
        throw error
      }
    });

    it('fails to compile an invalid TypeScript file because no value inside object', async () => {
      try {
        const test = await cosmiconfig('test-error', {
          loaders: {
            '.ts': loader()
          }
        }).load(path.resolve(FIXTURES_PATH, 'test-error.config.ts'))
        expect(test?.config).toEqual({ foo: 'bar' });
      } catch (error) {
        expect(error).toBeInstanceOf(TypeScriptCompileError);
        expect(error.toObject().message).toMatch('Failed to compile TypeScript');
      }
    });

    it('fails to compile an invalid TypeScript file because interface mismatch', async () => {
      try {
        const test = await cosmiconfig('error-interface-mismatch', {
          loaders: {
            '.ts': loader()
          }
        }).load(path.resolve(FIXTURES_PATH, 'error-interface-mismatch.config.ts'))
        expect(test?.config).toEqual({ foo: 'bar' });
      } catch (error) {
        expect(error).toBeInstanceOf(TypeScriptCompileError);
        expect(error.toObject().message).toMatch('Failed to compile TypeScript');
      }
    });
  })

  describe('via cosmiconfigSync API', () => {
    it('compiles a valid TypeScript file', () => {
      const test = cosmiconfigSync('test-success', {
        loaders: {
          '.ts': loader()
        }
      }).load(path.resolve(FIXTURES_PATH, 'test-success.config.ts'))
      expect(test?.config).toEqual({ foo: 'bar' });
    });

    it('fails to compile an invalid TypeScript file because no value inside object', () => {
      try {
        const test = cosmiconfigSync('test-error', {
          loaders: {
            '.ts': loader()
          }
        }).load(path.resolve(FIXTURES_PATH, 'test-error.config.ts'))
        expect(test?.config).toEqual({ foo: 'bar' });
      } catch (error) {
        expect(error).toBeInstanceOf(TypeScriptCompileError);
        expect(error.toObject().message).toMatch('Failed to compile TypeScript');
      }
    });

    it('fails to compile an invalid TypeScript file because interface mismatch', () => {
      try {
        const test = cosmiconfigSync('error-interface-mismatch', {
          loaders: {
            '.ts': loader()
          }
        }).load(path.resolve(FIXTURES_PATH, 'error-interface-mismatch.config.ts'))
        expect(test?.config).toEqual({ foo: 'bar' });
      } catch (error) {
        expect(error).toBeInstanceOf(TypeScriptCompileError);
        expect(error.toObject().message).toMatch('Failed to compile TypeScript');
      }
    });
  })
});
