const initialState = {
  slider: [],
  isSliderLoading: false,
  error: null,
};

const sliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SLIDER_REQUEST":
      return { ...state, isSliderLoading: true, error: null };
    case "FETCH_SLIDER_SUCCESS":
      return { ...state, slider: action.payload, isSliderLoading: false };
    case "FETCH_SLIDER_FAILURE":
      return { ...state, isSliderLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default sliderReducer;
