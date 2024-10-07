export const updateUserReducer = (state = false, action) => {
    switch (action.type) {
      case "UPDATE_USER":
        return !state;
      default:
        return state;
    }
  };

  export const updateStylistReducer = (state = false, action) => {
    switch (action.type) {
      case "UPDATE_STYLIST":
        return !state;
      default:
        return state;
    }
  };
  
  