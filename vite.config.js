import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/perler-bead-inventory/',  // 必须与仓库名完全一致
  build: {
    outDir: 'dist',  // 明确指定构建输出目录为 dist（默认也是，但显式声明更稳妥）
    assetsDir: 'assets'  // 静态资源（JS/CSS）输出到 dist/assets 目录
  }
})
