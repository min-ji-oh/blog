import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "OMG WORLD",
  base: '/',
  description: "study",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [   
      { text: 'ABOUT✨ME', link: '/career' }
    ],

    sidebar:[
      {
        text: '코드 잘짜기!',
        items: [
          { text: 'Clean', link: '/clean-code' }
        ]
      },
      {
        text: '모던리액트딥다이브',
        items: [
          { text: '리액트와 상태 관리 라이브러리', link: '/modern/state' },
          { text: 'React 랜더링', link: '/modern/render' },
          { text: 'Reflow와 Repaint', link: '/modern/reflow' },
          { text: '구조 분해 할당', link: '/modern/destructure' },
          { text: '서버사이드', link: '/modern/serverside' },
          { text: '웹성능지표', link: '/modern/web-vitals' },
        ]
      },
      {
        text: 'FE 적응기',
        items: [
          { text: 'next/image가 문제였다고요?', link: '/fe-experience/img' },
          { text: 'layout 영향 없이 페이지 만들기', link: '/fe-experience/layout' },
          { text: 'React Query 로딩 처리', link: '/fe-experience/loading' },
          { text: '웹접근성', link: '/fe-experience/accessibility' },
        ]
      },

    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/min-ji-oh' }
    ],
    search: {
      provider: 'local'
    }
  }
})
