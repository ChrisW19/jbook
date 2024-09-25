import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;


const bundle = async (rawCode: string) => {
  // Initialize service if it hasn't been started yet
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)], // Ensure fetchPlugin requires rawCode
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  // Return the output code as text
  return result.outputFiles[0].text;
};

export default bundle;