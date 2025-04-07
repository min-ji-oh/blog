import{_ as a,c as i,o as t,ag as n}from"./chunks/framework.DPDPlp3K.js";const d=JSON.parse('{"title":"Next.js에서 layout 영향 없이 페이지 만들기!","description":"","frontmatter":{},"headers":[],"relativePath":"fe-experience/layout.md","filePath":"fe-experience/layout.md"}'),e={name:"fe-experience/layout.md"};function p(l,s,h,k,r,o){return t(),i("div",null,s[0]||(s[0]=[n(`<h1 id="next-js에서-layout-영향-없이-페이지-만들기" tabindex="-1">Next.js에서 layout 영향 없이 페이지 만들기! <a class="header-anchor" href="#next-js에서-layout-영향-없이-페이지-만들기" aria-label="Permalink to &quot;Next.js에서 layout 영향 없이 페이지 만들기!&quot;">​</a></h1><p>최근 작업한 Picks서비스 중 키워드 픽스 페이지 하나를 레이아웃과는 독립적으로 동작하게 만들 일이 생겼습니다. 전체 헤더나 푸터 뿐만 아니라 picks 탭 레이아웃에도 독립되어야 했어요. Next.js에서는 App Router 구조에서 기본적으로 layout.tsx를 통해 페이지를 감싸게 되는데, 처음엔 이런 구조에서 특정 페이지만 레이아웃을 빼는 방법을 몰라서 꽤 시간을 썼어요.</p><h2 id="처음엔-미들웨어에서-해결하려-했어요" tabindex="-1">처음엔 미들웨어에서 해결하려 했어요 <a class="header-anchor" href="#처음엔-미들웨어에서-해결하려-했어요" aria-label="Permalink to &quot;처음엔 미들웨어에서 해결하려 했어요&quot;">​</a></h2><p>처음에는 middleware.ts에서 조건 분기를 통해 레이아웃 적용을 우회하는 방향을 생각했어요.</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 예시 (잘못된 접근)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (pathname.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">startsWith</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/auth&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 인증 페이지는 별도 처리해야 하나?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>하지만 미들웨어는 요청에 대한 사전 처리만 할 수 있을 뿐, 레이아웃 구조 자체를 제어하진 못한다는 걸 알게 됐어요. 결국 미들웨어는 적절한 해결책이 아니었고, 더 나은 방법이 필요했어요.</p><h2 id="해답은-폴더-이름에-괄호-를-사용하는-것이었어요" tabindex="-1">해답은 폴더 이름에 괄호 ( )를 사용하는 것이었어요 <a class="header-anchor" href="#해답은-폴더-이름에-괄호-를-사용하는-것이었어요" aria-label="Permalink to &quot;해답은 폴더 이름에 괄호 ( )를 사용하는 것이었어요&quot;">​</a></h2><p>Next.js App Router에서는 폴더 이름에 괄호를 붙이면, 해당 폴더를 경로에 반영하지 않고, layout에도 포함되지 않도록 분리할 수 있어요. 공식 문서에서는 이를 &quot;Group routes without affecting the URL structure&quot; 라고 설명하고 있어요.</p><p>예를 들어, 이렇게 구성해보세요:</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">project</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├── (layout)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               → 일반 레이아웃 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 특정 레이아웃 사용</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   ├── (picksLayout).tsx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   │   ├── [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">not</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">found]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   │   ├── layout.tsx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   │   └── page.tsx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   ├── layout.tsx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   └── page.tsx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└── (nolayout)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               → 별도 레이아웃 없음</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    └── page.tsx</span></span></code></pre></div><p>이 경우, /nolayout 경로는 layout.tsx의 영향을 받지 않게 돼요.</p><h2 id="마무리하며" tabindex="-1">마무리하며 <a class="header-anchor" href="#마무리하며" aria-label="Permalink to &quot;마무리하며&quot;">​</a></h2><p>Next.js의 App Router 구조는 유연하면서도 강력하지만, 처음 접할 때는 이런 세부 기능들이 낯설 수 있어요. 저희도 처음엔 미들웨어에서 우회적으로 해결하려고 시도했지만, 공식적인 방법인 괄호를 이용한 라우팅 그룹 분리를 알게 된 후에는 훨씬 명확하게 구조를 잡을 수 있었어요. 괄호 폴더 ( )를 활용하면 구조적으로도 깔끔하고, 의도도 분명하게 레이아웃을 분리 할 수 있어요.</p>`,13)]))}const c=a(e,[["render",p]]);export{d as __pageData,c as default};
