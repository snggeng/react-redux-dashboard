import { FETCHING_FURNITURE, ADD_FURNITURE, ADD_MULTIPLE_FURNITURES,
        FETCHING_FURNITURE_ERROR, FETCHING_FURNITURE_SUCCESS, REMOVE_FETCHING,
        UPDATE_FURNITURE_FIELDS, EDIT_FURNITURE } from '../actions/furnitureActions'

const initialState = {
  isFetching: true,
  error: '',
}

export default function furnitures (state = initialState, action) {
  switch (action.type) {
    case FETCHING_FURNITURE :
      return {
        ...state,
        isFetching: true,
      }
    case ADD_FURNITURE :
      return {
        ...state,
        addedFurnitures: action.furniture
      }
    case EDIT_FURNITURE :
      return {
        ...state,
        furnitures: {
          ...state.furnitures,
          [action.furniture.furnitureId]: action.furniture
        }
      }
    case FETCHING_FURNITURE_SUCCESS :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.furniture.furnitureId]: action.furniture,
      }
    case FETCHING_FURNITURE_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING :
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    case ADD_MULTIPLE_FURNITURES :
      return {
        ...state,
        furnitures: action.furnitures
      }
    case UPDATE_FURNITURE_FIELDS :
      return {
        ...state,
        furnitureFields: action.newFurnitureFields
      }
    default :
      return state
  }
}
