# 상태 관리(State Management)란?

- **상태 관리**는 애플리케이션에서 **데이터(상태)를 효율적으로 저장하고 업데이트하는 기법** 특히 **프론트엔드 개발**에서 중요한 개념으로, UI와 데이터의 일관성을 유지하는 데 필수적입니다.
1. **상태(State)란?**
- **>** 애플리케이션이 특정 시점에 가지고 있는 **데이터의 집합**

**ex)**  로그인 여부,  장바구니 목록, 입력 폼 데이터, API에서 받아온 사용자 정보

## Flux 패턴 등장

- 단방향으로 데이터 흐름을 변경하게 됨
## 상태관리의 필요성 (지역 상태(useState) vs 전역 상태(store))

1. **지역 상태의 한계**

→ useState, useReducer는 개별 컴포넌트에서만 관리 가능하지만,

여러 컴포넌트에서 동일한 상태를 공유하려면 상태를 끌어올리거나(props drilling), Context API를 사용해야 함.

Context API는 상태 주입을 위한 용도(Props drilling 보완)로 사용되므로 상태 관리의 목적과 다름.

2. **전역 상태 관리의 필요성**

→ 컴포넌트 외부에서 상태를 관리하는 store 개념이 필요하며, 이를 위해 Recoil, Jotai, Zustand 같은 라이브러리가 등장함.

3. **라이브러리별 차이점**

→ Recoil은 페이스북이 만든 공식적인 라이브러리, Jotai는 더 간결한 API를 제공, Zustand는 Redux와 유사한 패턴으로 가볍고 빠름.

## 주요 상태 관리 라이브러리 비교

| 라이브러리 | 특징 | 장점 | 단점 |
| --- | --- | --- | --- |
| **React useState** | 컴포넌트 내부에서 상태 관리 | 간단함, 빠름 | 전역 상태 관리 어려움 |
| **Redux** | Flux 아키텍처 기반 상태 관리 | 강력한 전역 상태 관리, DevTools 지원 | 설정이 복잡함 |
| **Recoil** | 원자(atom) 기반 상태 관리 | 간편한 전역 상태 관리, 직관적 | 아직 성숙하지 않음, 업데이트가 활발하지 않음 |
| **MobX** | 관찰 가능한 상태 기반 관리 | 코드가 간결함 | 디버깅 어려움 |
| **Zustand** | 미니멀한 상태 관리 라이브러리 | Redux보다 간단, 빠름 | 기능이 제한적 |

--- 

 ::: details 현재 우리가 사용하는 라이브러리 , ZUSTAND 를 선택한 이유
1. 가볍고 빠릅니다.
    - Redux보다 [보일러플레이트](https://coding-grandpa.tistory.com/2) 코드가 적다
    - Recoil보다 구조가 단순해서 성능이 좋음
2. 직관적인 API
    - immer기반의 set함수로 상태를 쉽게 업데이트할 수 있고, React의 기본적인 상태관리방식와 비슷해서 학습 쉬움
3. 선언적 사용 가능
    - zustand의 subscribe 기능을 이용하면 Redux처럼 외부에서도 상태를 제어할 수 있고 context없이도 전역 상태를 관리 가능
4. 불필요한 리렌더링 최소화
    - zustand는 필요한 상태만 구독하는 방식이라 불필요한 렌더링이 적어 성능 최적화에 유리함
5. 서버사이드 지원
    - Next.js 같은 환경에서도 쉽게 사용이 가능하다
6. 추가로.. Redux 다음으로 많이 쓰는 라이브러리!!
:::