// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base 경로를 "/GayoungProject/DragonsDilemma/"로 수정합니다.
  base: "/GayoungProject/DragonsDilemma/", 
  plugins: [react()],
})