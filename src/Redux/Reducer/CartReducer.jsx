const cartItems = [];
import { toast } from "react-hot-toast";

export const addToCartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(Array.isArray(cartItems));

      const alreadyproductexist = state.cartItems.find(
        (item) => item?.pro_id === action.payload?.pro_id
      );
      if (alreadyproductexist) {
        toast.error(`${action.payload?.title} Already In Cart `);
        return {
          ...state,
          cartItems: state.cartItems?.map(
            (item) => (item?.pro_id === action?.payload?.pro_id ? action.payload : item)

            // item?.id === action.payload?.id ? { ...alreadyproductexist, qty: alreadyproductexist.qty  } : item double click qty add
          ),
        };
      } else {
        toast.success(`${action.payload?.title} Added to cart! `);

        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case "DELETE_FROM_CART":
      toast.success(`Item Remove Successfully From Cart `);
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.pro_id !== action.payload.pro_id;
        }),
      };
    default:
      return state;
  }
};
