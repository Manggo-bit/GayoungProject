// vite.vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 이 부분을 추가하세요! 저장소 이름은 '/GayoungProject/' 입니다.
  base: "/GayoungProject/", 
  plugins: [react()],
})