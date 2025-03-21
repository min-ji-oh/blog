# 구조 분해 할당

구조 분해 할당은 객체나 배열에서 값을 추출하여 개별 변수에 할당하는 문법이에요. 
이는 코드의 가독성과 편의성을 높여주는 중요한 특징을 가집니다.

### **배열 구조 분해 할당**
배열 구조 분해 할당은 배열의 인덱스 순서대로 값을 변수에 할당해요

```jsx
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a, b, c); // 1, 2, 3
```

- **인덱스 생략**: 중간 인덱스를 생략하고 싶을 경우, 빈 자리(`,` 사용)로 표현할 수 있어요
    
    ```jsx
    const arr = [1, 2, 3, 4];
    const [a, , c, d] = arr;
    console.log(a, c, d); // 1, 3, 4
    ```
    

위와 같이 `, ,` 로 생략할 수 있으며, 원하는 요소만 할당할 수 있어요

- **나머지 할당** : 나머지 요소를 하나의 배열로 받을 때 `...` 연산자를 사용해요
    
    ```jsx
    const arr = [1, 2, 3, 4, 5];
    const [a, b, ...rest] = arr;
    console.log(a, b, rest); // 1, 2, [3, 4, 5]
    ```
    

### **객체 구조 분해 할당**

객체 구조 분해는 객체에서 키를 사용하여 값을 추출하는 방식이에요. 객체는 속성 이름이 동일한 변수를 찾기 때문에, 배열과는 다르게 명시적으로 이름을 사용하여 값을 할당해요.

    ```jsx
    const person = { name: 'John', age: 30 };
    const { name, age } = person;
    console.log(name, age); // John, 30
    ```
    
- **다른 변수명으로 할당하기**: 객체 구조 분해를 할 때, 다른 이름으로 값을 할당할 수도 있어요.(변수명이 다를 때 유용해요.)
    
    ```jsx
    const person = { name: 'John', age: 30 };
    const { name: fullName, age: yearsOld } = person;
    console.log(fullName, yearsOld); // John, 30
    ```
    
- **기본값 할당**: 객체의 속성이 없을 경우, 기본값을 지정할 수 있어요.
    
    ```jsx
    const person = { name: 'John' };
    const { name, age = 25 } = person;
    console.log(name, age); // John, 25
    ```
    
- **나머지 객체 할당 (Rest Operator `...`)**: 객체에서 특정 속성을 제외하고 나머지 속성들을 하나의 객체로 받을 수 있어요.
    
    ```jsx
    const person = { name: 'John', age: 30, country: 'USA' };
    const { name, ...rest } = person;
    console.log(name); // John
    console.log(rest); // { age: 30, country: 'USA' }
    ```
    

---
## 2. **객체 초기자 (Object Property Shorthand)**

객체를 선언할 때, 이미 존재하는 변수를 객체의 속성으로 간단하게 넣을 수 있는 방법이에요. 객체의 속성명과 변수명이 동일하다면, 해당 속성명을 생략할 수 있어요.
 ```jsx
    const a = 1;
    const b = 2;
    const obj = { a, b }; //`{ a: a, b: b }`와 동일
    console.log(obj); // { a: 1, b: 2 }
    ```