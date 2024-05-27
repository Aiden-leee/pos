function History({ data, selectItem }) {
  // sales 상세보기
  function handleDetailSales(item) {
    selectItem(item);
  }

  return (
    <div>
      <ul className="flex flex-auto p-2 bg-defaultBg">
        <li className="basis-3/6">
          <strong>OrderID</strong>
        </li>
        <li className="basis-2/6">
          <strong>Date</strong>
        </li>
        <li className="basis-1/6">
          <strong>Total</strong>
        </li>
      </ul>
      <ul className="">
        {data &&
          data.map((item) => (
            <li
              key={item.id}
              className="flex flex-auto even:bg-defaultBg py-3 px-2 cursor-pointer"
              onClick={() => handleDetailSales(item)}
            >
              <span className="basis-3/6">{item.tid}</span>
              <span className="basis-2/6">{item.paydate}</span>
              <span className="basis-1/6">{item.price}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default History;
