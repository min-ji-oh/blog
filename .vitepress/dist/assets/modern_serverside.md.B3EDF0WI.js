import{_ as t,c as e,o as a,ae as s}from"./chunks/framework.Dh1jimFm.js";const h=JSON.parse('{"title":"클라이언트사이드와 서버사이드 렌더링","description":"","frontmatter":{},"headers":[],"relativePath":"modern/serverside.md","filePath":"modern/serverside.md"}'),d={name:"modern/serverside.md"};function o(b,r,n,i,S,_){return a(),e("div",null,r[0]||(r[0]=[s('<h1 id="클라이언트사이드와-서버사이드-렌더링" tabindex="-1">클라이언트사이드와 서버사이드 렌더링 <a class="header-anchor" href="#클라이언트사이드와-서버사이드-렌더링" aria-label="Permalink to &quot;클라이언트사이드와 서버사이드 렌더링&quot;">​</a></h1><p>서버 라우팅의 경우 페이지를 전환할 떄 마다 서버로 요청하고 서버에서 렌더링하는 반면, 클라이언트 라우팅은 페이지를 클라이언트에서 처리하고 필요한 부분만 업데이트해요.</p><h3 id="csr-과-ssr-비교" tabindex="-1">CSR 과 SSR 비교 <a class="header-anchor" href="#csr-과-ssr-비교" aria-label="Permalink to &quot;CSR 과 SSR 비교&quot;">​</a></h3><table tabindex="0"><thead><tr><th>클라이언트 사이드 렌더링</th><th>서버 사이드 렌더링</th></tr></thead><tbody><tr><td>클라이언트 측에서 페이지를 랜더링하는 방식을 말해요. CSR은 서버로부터 받아온 데이터를 클라이언트에서 JavaScript를 통해 동적으로 조작하여 렌더링 해요.</td><td>서버 측에서 페이지를 렌더링하는 방식이애요. 서버에서 페이지를 렌더링한 후에, 클라이언트에게 전달되며, 클라이언트에서는 추가적인 JS로딩이 필요하지 않아요.</td></tr><tr><td><strong>장점</strong><br>1. 높은 사용자 경험: <br>CSR은 클라이언트 측에서 데이터를 받아와 렌더링하기 때문에 페이지 이동 속도가 빠르고, 새로고침이 발생하지 않아 사용자 경험이 높아요<br><br>2. 캐싱가능:<br> 클라이언트에서 캐시를 사용하여 적은 양의 데이터만 다시 용청하여 처리하는 것이 가능해요<br><br>3. 적은 서버 부하:<br> CSR에서는 클라이언트에서 데이터를 처리하기 때문에 서버 부하가 적어요</td><td><strong>장점</strong><br>1. 최초 페이지 진입이 비교적 빨라요<br><br>2. 검색 엔진과 SNS 공유 등 메타데이터 제공에 유리해요<br><br>3. 누적 레이아웃 이동이 적어요<br><br>4. 사용자의 디바이스 성능에 비교적 자유로워요<br><br>5. 보안에 안전해요</td></tr><tr><td><strong>단점</strong><br>1. 초기 로딩 속도가 느린편이에요<br><br>2. SEO에 불리해요<br><br>3. 낮은 보안성을 가지고있어요</td><td><strong>단점</strong><br>1. 소스코드를 작성할 때 항상 서버를 고려해야해요.<br><br>2. 적절한 서버가 구축되어 있어야 해요.<br><br>3. 서비스 지연에 따른 문제: 렌더링 작업이 끝나기까지는 사용자에게 그 어떤 정보도 제공할 수 없어요</td></tr></tbody></table><hr><p>서버 측 렌더링에는 장점들이 많이 있지만 언제나 선택해야하는 최적의 상황은 아니에요. SSR은 SEO를 개선시키고 진입이 빨라 사용자 경험이 높지만 모든 요청마다 렌더링해야하므로 서버 부하가 올 수 있어요. <br> 그러므로 클라이언트 측 렌더링과 더불어 각각 상황에 맞게 개발하는 것이 필요해요.</p>',6)]))}const l=t(d,[["render",o]]);export{h as __pageData,l as default};
