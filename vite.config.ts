import * as path from "path";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';   //引入自动引入插件
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';  // 按需导入arco.design

export default defineConfig({
    plugins: [
        vue(),
        // 自动导入ref
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: ['vue', 'vue-router', 'pinia'],
            dts: 'src/auto-import.d.ts',
            eslintrc: {
                enabled: false,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true
            },
        }),
        // 按需导入arco.design
        Components({
            dirs: ['src/components'],
            extensions: ['vue'],//文件扩展
            resolvers: [
                ArcoResolver({
                    sideEffect: true
                })
            ],
            // 配置type文件生成位置
            dts: 'src/components.d.ts'
        })
    ],
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"), // path记得引入
        }
    },

    // 跨域
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: "http://localhost:8080/", //跨域地址
                changeOrigin: true, //支持跨域
                rewrite: (path) => path.replace(/^\/api/, "")//重写路径,替换/api
            }
        }
    },
})
