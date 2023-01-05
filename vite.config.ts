import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@/components': resolve(__dirname, 'src', 'components'),
        '@/containers': resolve(__dirname, 'src', 'containers'),
        '@/utils': resolve(__dirname, 'src', 'utils'),
        '@/hooks': resolve(__dirname, 'src', 'hooks'),
        '@/router': resolve(__dirname, 'src', 'router'),
        '@/layouts': resolve(__dirname, 'src', 'layouts'),
        '@/pages': resolve(__dirname, 'src', 'pages'),
        '@/locales': resolve(__dirname, 'public', 'locales'),
        '@/types': resolve(__dirname, 'src', 'types'),
        '@/redux': resolve(__dirname, 'src', 'redux'),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:5]',
      },
    },
    build: {
      sourcemap: false,
    },
  };
});
