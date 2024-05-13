// 통화 변환
export const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "krw", // USD, jpy...
});

// 인원수 생성
export const headCount = Array.from({ length: 10 }, (_, i) =>
  i === 0 ? { value: 0, name: "0" } : { value: i, name: i.toString() }
);
