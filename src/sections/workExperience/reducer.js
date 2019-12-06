const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        workexp: [...state.workexp, action.section],
        selectedId: action.section.id
      };
    }
    case "remove": {
      const { selectedId, workexp } = state;
      if (workexp.length <= 1) return state;
      const isSelected = selectedId === action.id;
      const indexOfSelected = workexp.findIndex(exp => exp.id === action.id);
      const newIndex =
        indexOfSelected === workexp.length
          ? workexp.length - 1
          : indexOfSelected === 0
          ? 1
          : indexOfSelected - 1;
      return {
        ...state,
        selectedId: isSelected ? state.workexp[newIndex].id : state.selectedId,
        workexp: state.workexp.filter(exp => exp.id !== action.id)
      };
    }
    case "select": {
      return { ...state, selectedId: action.id };
    }
    case "edit": {
      return {
        ...state,
        workexp: state.workexp.map(exp =>
          exp.id === action.id ? { ...exp, [action.fieldName]: action.value } : exp
        )
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
