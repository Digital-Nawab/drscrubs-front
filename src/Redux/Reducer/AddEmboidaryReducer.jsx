const emboidary = [];
import { toast } from "react-hot-toast";

export const addemboidaryReducer = (state = { emboidary: [] }, action) => {
    switch (action.type) {
        case "ADD_EMBOIDARY":
            //   console.log(Array.isArray(cartItems));

            const alreadyproductexist = state.emboidary.find(
                (item) => item?.pro_id === action.payload?.pro_id
            );
            if (alreadyproductexist) {
                // toast.error(`rfe `);
                return {
                    ...state,
                    cartItems: state.emboidary?.map(
                        (item) => (item?.id === action?.payload?.pro_id ? action.payload : item)

                        // item?.id === action.payload?.id ? { ...alreadyproductexist, qty: alreadyproductexist.qty  } : item double click qty add
                    ),
                };
            } else {
                toast.success(`Emboidary Added! `);
                return {
                    ...state,
                    emboidary: [...state.emboidary, action.payload],
                };
            }

           
        //   }

        case "DELETE_EMBOIDARY":
            toast.success(`Item Remove Successfully From Cart `);
            return {
                ...state,
                emboidary: state.emboidary.filter((item) => {
                    return item.pro_id !== action.payload.pro_id;
                }),
            };
        default:
            return state;
    }
};
