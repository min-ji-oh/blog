# 로딩 중인데 NoData가 먼저 보여요 :React Query 로딩 처리

최근 React Query를 사용하는 화면에서 데이터 로딩 중인데도 NoData 컴포넌트가 먼저 렌더링되는 문제를 겪었어요. 사용자 입장에서는 "로딩 중"이 아니라 "진짜로 데이터가 없는 것처럼" 보이기 때문에, UX에 혼란을 줄 수 있었어요.

처음엔 isLoading을 기준으로 로딩 여부를 판단했지만, 생각보다 예상치 못한 동작이 자주 발생했어요. 그래서 React Query의 status 값을 함께 확인하면서 문제를 해결할 수 있었어요.

## 문제 상황 – 로딩인데 NoData 컴포넌트가 먼저 나왔어요

기존에는 아래 코드와 같이 로딩 상태를 처리하고 있었어요:
```jsx
const { data, isLoading } = useQuery(['users'], fetchUsers);

if (isLoading) {
  return <Loading />;
}

if (!data || data.length === 0) {
  return <NoData />;

return <ProductList users={data} />;
}
```
처음에는 잘 작동하는 듯했지만, 특정 조건에서 isLoading이 false이고 data도 undefined인 경우가 있었어요. 이런 상황에서 `<NoData />`가 먼저 보여지고, 바로 이어서 다시 `<ProductList />`가 뜨는 일이 발생했어요. 
결과적으로는 로딩 상태를 정확히 인식하지 못한 조건 분기가 문제였어요.

## 원인 – isLoading만으로는 충분하지 않았어요
React Query에서는 isLoading 외에도 status, isFetching, isSuccess, isError 등 다양한 상태 값을 제공해요. isLoading은 일반적으로 첫 번째 요청일 때만 true가 되지만, 캐시 상태나 리페치 전략에 따라 정확한 시점을 잡기 어려울 수 있어요.

❗️isLoading만을 기준으로 로딩 상태를 판단하면 아직 데이터를 받지 못했지만 isLoading이 false인 상태를 처리하지 못할 수 있어요.

## 해결 – status 함께 사용하기
React Query의 status는 'pending' | 'success' | 'error' 중 하나의 값을 가지기 때문에, 이를 함께 비교해서 명확하게 조건을 나눴어요.

```jsx
const { data, isLoading, status } = useQuery(['users'], fetchUsers);

if (status === 'pending' || isLoading) {
  return <Loading />;
}

if (!data || data.length === 0) {
  return <NoData />;
}

return <ProductList users={data} />;
```
 isLoading || status === 'pending'보다는 status === 'pending'만 단독적으로 사용하는 방식이 더 명확하고 디버깅하기도 쉬울거같기도 해요.

## 추가 내용 – suspense를 사용하는 경우
React Query에서 suspense: true 옵션을 사용한다면 로딩 처리는 `<Suspense>`로 감싸서 처리할 수도 있어요.

```jsx
// 컴포넌트에서
<Suspense fallback={<Loading />}>
  <ProductListPage />
</Suspense>
```
이 방식은 더 깔끔하고 선언적이지만, 일부 상황에서는 유연하게 상태를 나누기 어려울 수도 있기 때문에 선택적으로 사용하면 좋아요.

## 마무리하며
React Query는 정말 강력한 도구이지만, 상태 관리를 섬세하게 하지 않으면 의도치 않은 UI가 렌더링되기도 한다는 것을 주의 해야해요. 이번 경험을 통해 단순히 isLoading만 보는 것보다는 status를 함께 활용하는 것이 훨씬 명확하고 안정적이라는 걸 알게 되었어요.

특히 초기 로딩과 빈 데이터 상태를 구분할 수 있게 되는 것만으로도 사용자 경험이 훨씬 깔끔해졌어요.