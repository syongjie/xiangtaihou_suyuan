/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-06-25 14:38:41
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-06-25 14:49:20
 * @FilePath: \order2-h5d:\小花\city-payfi\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginRequireTransform from 'vite-plugin-require-transform'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import vueDevTools from 'vite-plugin-vue-devtools';
import UnoCSS from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const processEnvValues = {
        'process.env': Object.entries(env).reduce((prev, [key, val]) => {
            prev[key] = val
            return prev
        }, {})
    }

    return {
        plugins: [
            vue(),
            vueJsx(),
            // vueDevTools(),
            UnoCSS(),
            createSvgIconsPlugin({
              // eslint-disable-next-line no-undef
              iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
              symbolId: 'icon-[dir]-[name]',
            }),
            vitePluginRequireTransform({
                fileRegex: /.ts$|.vue$/
            }),
        ],
        base: '/',
        define: { ...processEnvValues },
        resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
              buffer: 'buffer', // ���Ӷ� buffer �ı���֧��
            },
          },
          
        optimizeDeps: {
            esbuildOptions: {
                define: { global: 'globalThis' },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true
                    }),
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
          server: {
            open: true,
            host: true,
            port: 9001,
            proxy: {
            '/api': {
                target: 'https://ic0.app/',
                changeOrigin: true,
              }
            }
          },
        build: {
            minify: false,
            rollupOptions: {
                plugins: [
                    rollupNodePolyFill()
                ]
            }
        }
    }
})