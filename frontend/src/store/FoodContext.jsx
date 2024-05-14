import { createContext, useReducer } from "react";

const FoodCartContext = createContext({
  items: [],
  addItem: (idx) => {},
  decreaseItem: (id) => {},
  removeItem: (id) => {},
  updateItem: (id, quantity) => {},
  clearCart: () => {},
});

function foodCartReducer(state, action) {
  switch (action.type) {
    case "LOAD_ITEM":
      return { ...state, items: [...state.items, action.item] };

    case "ADD_ITEM":
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity++;
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.item] };
      }
    // const updatedTable = [...state.items];
    // const targetItem = updatedTable.foods[action.idx];
    // const updatedData = {
    //   ...targetItem,
    //   quantity: targetItem.quantity + 1,
    // };
    // console.log(updatedData);
    // const updatedTable = [...state.items];
    // const existingTableIndex = state.items.findIndex(
    //   (table) => table.table_id === action.table_id
    // );

    // // 테이블 이미 있는 경우
    // if (existingTableIndex > -1) {
    //   // 테이블의 주문 목록
    //   const updatedFoodLists = updatedTable[existingTableIndex].foods;
    //   const existingFoodIndex = state.items[
    //     existingTableIndex
    //   ].foods.findIndex((list) => list.id === action.item.id);

    //   // 이미 존재하는 주문목록의 경우
    //   if (existingFoodIndex > -1) {
    //     const existingFood =
    //       state.items[existingTableIndex].foods[existingFoodIndex];
    //     const updatedFood = {
    //       ...existingFood,
    //       quantity: existingFood.quantity + 1,
    //     };
    //     // 주문목록 업데이트
    //     updatedFoodLists[existingFoodIndex] = updatedFood;
    //     // 테이블 업데이트
    //     updatedTable[existingTableIndex].foods = updatedFoodLists;
    //   } else {
    //     updatedTable[existingTableIndex].foods.push({
    //       ...action.item,
    //       quantity: 1,
    //     });
    //   }
    // } else {
    //   updatedTable.push({
    //     table_id: action.table_id,
    //     foods: [{ ...action.item, quantity: 1 }],
    //   });
    // }
    // //console.log(updatedTable);
    // return {
    //   ...state,
    //   items: updatedTable,
    // };
    case "DECREASE_ITEM":
    // const existingFoodItemIndex = state.items.findIndex(
    //   (item) => item.id === action.id
    // );

    // const existingFoodItem = state.items[existingFoodItemIndex];
    // const updatedFoodItems = [...state.items];

    // // 기존 메뉴 개수 1개인 경우 삭제
    // if (existingFoodItem.quantity === 1) {
    //   updatedFoodItems.splice(existingFoodItemIndex, 1);
    // } else {
    //   const updateItem = {
    //     ...existingFoodItem,
    //     quantity: existingFoodItem.quantity - 1,
    //   };
    //   updatedFoodItems[existingFoodItemIndex] = updateItem;
    // }

    // return {
    //   ...state,
    //   items: updatedFoodItems,
    // };

    // case "REMOVE_ITEM":
    //   const removeItems = [...state.items];
    //   const removeIndex = state.items.findIndex(
    //     (item) => item.id === action.id
    //   );
    //   removeItems.splice(removeIndex, 1);
    //   return {
    //     ...state,
    //     items: removeItems,
    //   };

    // case "UPDATE_ITEM":
    //   const currentItemIndex = state.items.findIndex(
    //     (item) => item.id === action.current.id
    //   );
    //   const currentItem = state.items[currentItemIndex];
    //   const currentUpdateItem = [...state.items];

    //   const updated = {
    //     ...currentItem,
    //     quantity: action.current.quantity,
    //   };
    //   currentUpdateItem[currentItemIndex] = updated;

    //   return {
    //     ...state,
    //     items: currentUpdateItem,
    //   };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}

export function FoodCartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(foodCartReducer, { items: [] });

  function addItem(idx) {
    dispatchCartAction({ type: "ADD_ITEM", idx });
  }

  // function decreaseItem(id) {
  //   dispatchCartAction({ type: "DECREASE_ITEM", id });
  // }

  // function removeItem(id) {
  //   dispatchCartAction({ type: "REMOVE_ITEM", id });
  // }

  // function updateItem(id, quantity) {
  //   const current = { id, quantity };
  //   dispatchCartAction({ type: "UPDATE_ITEM", current });
  // }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    // decreaseItem,
    // removeItem,
    // updateItem,
    clearCart,
  };

  return (
    <FoodCartContext.Provider value={cartContext}>
      {children}
    </FoodCartContext.Provider>
  );
}

export default FoodCartContext;
