# Reflow와 Repaint
### Repaint
재결합된 렌더 트리를 기반으로 다시 화면에 페인트하는 것을 말해요.

### Reflow
레이아웃 계산을 다시 하는 것을 말해요, Reflow가 발생하면 Repaint는 필연적으로 발생해요.
Reflow가는 HTML 요소들의 위치와 크기를 다시 계산해야 하기 때문에, 리페인트에 비해서 시간이 오래걸려요.

변경하려는 특정 요소의 위치와 크기뿐 아니라, 연관된 다른 요소들의 위치와 크기까지 재계산해야 하기 때문이죠. 따라서 **리플로우가 자주 발생하도록 하는 코드는 지양해야해요.**

## **Reflow가 발생하는 이유**

Reflow는 다음과 같은 경우에 발생합니다.

1. **DOM 변경**
    - 새로운 요소가 추가되거나 삭제될 때
    - 노드의 위치, 크기, 패딩, 마진 등이 변경될 때
2. **스타일 변경**
    - CSS 속성이 변경될 때 -
      특히 레이아웃에 영향을 미치는 속성! (`width`, `height`, `margin`, `padding`, `border`)이 변경될 때
3. **윈도우 크기 변경**
    - 사용자가 브라우저 창 크기를 조정했을 때 전체 레이아웃 다시 계산
4. **동적 콘텐츠 변경**
    - JS로 텍스트를 추가하거나 DOM 노드를 조작할 때
5. **CSS의 특정 속성 사용**
    - `display`, `position`, `float`, `clear`, `vertical-align` 등의 속성이 바뀔 때
6. **특정 메소드 호출**
    - `offsetWidth`, `offsetHeight`, `clientWidth`, `clientHeight` 등의 메소드를 호출할 때 -> 브라우저는 최신 레이아웃 정보를 제공하기 위해 Reflow를 강제할 수 있어요.

## **Reflow 방지하는 방법**

#### 1. DOM 조작 최소화
- DOM 요소를 조작하기 전에 변경 사항을 모아 한 번에 적용해보세요. 예를들어 DOM 요소를 반복적으로 추가하거나 수정하는 대신 `DocumentFragment`를 사용해 한 번에 추가하세요.
#### 2. details CSS 최적화
- CSS에서 복잡한 선택자 특히 후손 선택자 (ex. div > div > div)를 피하고 간결한 선택자를 사용해봐요.
- 애니메이션이나 UI전환은 `transform` `opacity`와 같은 레이아웃을 변경하지 않는 속성을 활용해봐요.

#### 3. 배치 스타일 변경
- JS로 스타일을 변경할 때는 한 번에 여러 스타일을 설정해봐요.
    
    ```jsx
    // 비효율적
    element.style.width = "100px";
    element.style.height = "100px";
    
    // 효율적
    element.style.cssText = "width: 100px; height: 100px;";
    
    ```
    

#### 4. 레이아웃 읽기와 쓰기 분리

- 레이아웃 읽기(`offsetWidth`, `clientHeight`)와 쓰기(스타일 변경)를 번갈아 하지 마세요.
    
    ```jsx
    // 비효율적
    const height = element.offsetHeight;
    element.style.height = height + 10 + "px";
    
    // 효율적
    const height = element.offsetHeight;
    element.style.height = `${height + 10}px`;
    
    ```
    
#### 5. CSSOM 및 레이아웃 변경 최소화

- 애니메이션이나 인터랙션에서는 `will-change` 속성을 사용해 브라우저가 최적화를 할 수 있도록 해요.
- 복잡한 레이아웃 작업이 필요한 경우, 해당 요소에 `position: absolute` 또는 `position: fixed`를 설정해 독립적인 레이어로 처리해봐요.

#### 6. 서브트리 최적화
- DOM의 최상위 레벨 요소를 변경하는 대신 특정 서브트리(subtree)만 변경해요.
---
---

::: info 간단 요약
브라우저의 Reflow는 웹 페이지의 레이아웃이 다시 계산되는 과정을 말해요. 
DOM의 일부가 변경되면서 브라우저가 해당 변경 사항에 따라 레이아웃을 재계산해야 할 때 발생합니다.
Reflow는 CPU와 메모리를 소모하며, 과도하게 발생하면 성능 저하를 유발할 수 있어요!
:::
