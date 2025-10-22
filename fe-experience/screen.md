
# 접근 할 수 없는 팝업
> FE 코드리뷰 발표자료

## 📌 시작하며

여러분, 간단한 테스트 하나 해볼게요.  
우리 서비스에서 팝업이 하나 떴습니다.  
스크린리더 사용자에게는 어떻게 들릴까요?

```
A) "모달 다이얼로그가 열렸습니다"
B) "확인하세요! 중요한 내용입니다"
C) "............ (아무 소리도 안 남)"
```

**정답은 C입니다.**

아무 소리도 나지 않아요.  
팝업은 화면에 떴지만, 스크린리더는 침묵합니다.

왜 그럴까요? 오늘은 이 문제를 파헤쳐보려고 합니다.


## 🎭 실제 사용자는 뭘 경험할까

### 시나리오: PICKS 추천 도서를 받기 위한 평가 늘리기 버튼 클릭!

#### 시각적으로 서비스를 이용하는 사람:

1. 버튼 클릭
2. 팝업 확인
3. 상품 리스트 중에서 "읽어보고 싶어요" / "취향이 아니에요" 버튼을 클릭
4. 반영되었다는 toast 메시지를 확인하고 다음 상품의 설문을 진행
5. 모든 평가 완료
6. 확인 버튼 클릭으로 마무리

#### 스크린리더로 서비스를 이용하는 사람:

1. 버튼 클릭
2. (...)
3. "뭔가 일어난 건가? 담긴 건가?"
4. Tab 키를 몇 번 눌러봄
5. 갑자기 포커스가 엉뚱한 곳으로
6. 혼란스러움

**차이가 보이시나요?**

---

## ⚠️ 그럼 뭐가 기술적으로 문제일까요? 

### 문제 1: 역할이 없는 요소

```tsx
// ❌ 현재
<div className='modal-overlay'>
    <div className='modal-content'>{children}</div>
</div>
```

스크린리더는 이게 중요한 팝업인지 모릅니다.  
그냥 수많은 div 중 하나로 인식하죠.

### 문제 2: 포커스 관리 부재

팝업이 떴는데 포커스는 여전히 뒤에 있는 버튼에 머물러 있습니다.  
스크린리더 사용자는 팝업이 떴다는 걸 인지하기 어렵습니다.

### 문제 3: 컨텍스트 단절

ESC 키로 팝업을 닫을 수는 있습니다.  
하지만 스크린리더는 팝업이 닫혔다는 걸 알려주지 않습니다.

### 문제 4: 배경 간섭

팝업 뒤의 콘텐츠도 여전히 접근 가능합니다.  
Tab 키를 누르면 팝업 안팎을 오가며 혼란스러워집니다.

---

## 💡 해결 방법

하나씩 해결해보겠습니다.

### 1단계: 역할 부여하기

```tsx
// ✅ 개선
<div
    role='dialog'
    aria-modal='true'
    aria-labelledby='modal-title'
    aria-describedby='modal-desc'
>
    <h2 id='modal-title'>장바구니</h2>
    <p id='modal-desc'>상품이 장바구니에 담겼습니다</p>
    {children}
</div>

<div role="alert">TOAST</div>
```

**효과:**  
이제 스크린리더가 이렇게 읽어줍니다:  
_"다이얼로그. 장바구니. 상품이 장바구니에 담겼습니다."_

#### 💡 배경지식

**Accessible Name**  
스크린리더가 요소를 포커스했을 때 읽는 값입니다. 다음 중 하나로 결정됩니다:

1. **author**: 특별한 속성을 사용해서 정하는 값  
   - `aria-label`, `aria-labelledby`, `alt` (img 태그)
2. **contents**: 요소의 텍스트 값  
   - 우선순위: author > contents

**Role**  
스크린리더가 요소를 어떤 방식으로 다룰지 결정하는 속성입니다.  
시멘틱 태그의 경우 이미 role을 가지고 있으며, role마다 기대되는 스크린리더 동작이 있습니다.

예시: `role='button'`
- 요소의 Accessible Name을 읽은 뒤 "버튼"을 붙여 읽음
- 자식 요소의 Name을 모아서 contents로 사용

```tsx
<div role="button" aria-label="추천도서평가">
    평가하기
</div>

// 스크린리더가 읽는 것: "추천도서평가 버튼"
```

**dialog와 aria-modal**
- `role="dialog"`: 사용자가 상호작용할 수 있는 대화상자를 의미
- `aria-modal="true"`: 스크린리더가 dialog 밖의 요소에 포커스할 수 없게 만드는 속성
- 스크린리더가 dialog만 포커스하게 되므로 사용자가 dialog의 존재를 명확히 인지할 수 있음
---

### 2단계: 포커스 자동 이동

```tsx
const modalRef = useRef<HTMLDivElement>(null)

useEffect(() => {
    const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (firstFocusable instanceof HTMLElement) {
        firstFocusable.focus()
    }
}, [])
```

**효과:**  
팝업이 열리면 자동으로 첫 번째 버튼으로 포커스가 이동합니다.

---

### 3단계: 포커스 가두기 (Focus Trap)

```tsx
const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    const focusables = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const first = focusables?.[0] as HTMLElement
    const last = focusables?.[focusables.length - 1] as HTMLElement

    if (e.shiftKey && document.activeElement === first) {
        last?.focus()
        e.preventDefault()
    } else if (!e.shiftKey && document.activeElement === last) {
        first?.focus()
        e.preventDefault()
    }
}
```

**효과:**  
이제 Tab 키를 눌러도 팝업 밖으로 나가지 않습니다.

---

### 4단계: 배경 비활성화

```tsx
useEffect(() => {
    const main = document.querySelector('main')

    if (main) {
        main.setAttribute('aria-hidden', 'true')
    }

    return () => {
        main?.removeAttribute('aria-hidden')
    }
}, [])
```

**효과:**  
배경 콘텐츠는 스크린리더에서 숨겨집니다.

#### 💡 배경지식

**aria-hidden**  
요소에 `aria-hidden='true'`를 명시할 경우, 스크린리더가 해당 요소와 자식 요소를 읽지 않습니다.  
모달이 열려있을 때 배경 콘텐츠에 접근하지 못하도록 하는 데 유용합니다.

---

## 🎯 마치며

교보 FE 개편 서비스가 늘어나면서 점점 개발 규모가 커지는데 조금만 신경 써서 UX를 개선하고
차별이나 사용자 제약을 받는 일이 없도록 하면서 고객을 놓치지 않도록 함께 노력했으면 좋겠습니다! ^_^

