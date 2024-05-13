// 초기값
// select 데이터 형태
const selectInit = [
  { value: "선택", name: "선택하세요" },
  { value: "list1", name: "list1" },
  { value: "list2", name: "list2" },
];

function Select({ lists = selectInit, name, onChangeCurrent, current }) {
  function handleSelect(event) {
    const { value } = event.target;
    onChangeCurrent(+value);
  }

  return (
    <select onChange={handleSelect} name={name} value={current}>
      {lists.map((list) => (
        <option key={list.value} value={list.value}>
          {list.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
