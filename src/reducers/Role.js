export const setRoleReducer = (state = "", action) => {
    switch (action.type) {
      case 'SET_ROLE':
        return {
          ...state,
          role: action.role,
        };
      default:
        return state;
    }
  };