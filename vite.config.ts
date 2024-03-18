import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'   //引入自动引入插件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'  // 按需导入arco.design

export default defineConfig({
  plugins: [
    vue(),
    // 自动导入ref
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-import.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    // 按需导入arco.design
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],//文件扩展
      resolvers: [ElementPlusResolver()],
      // 配置type文件生成位置
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src') // path记得引入
    }
  },

  // 跨域
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/', //跨域地址
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, '')//重写路径,替换/api
      }
    }
  },


  // 配置打包
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/")
            : [];
          const fileName1 =
            facadeModuleId[facadeModuleId.length - 2] || "[name]";
          return `js/${fileName1}/[name].[hash].js`;
        },
        entryFileNames: "js/[name].[hash].js",
        assetFileNames: "[ext]/[name].[hash:4].[ext]",
      },
    },
  }

})
