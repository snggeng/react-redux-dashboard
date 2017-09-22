import { ref } from '../config/constants'

export const FETCHING_FURNITURE = 'FETCHING_FURNITURE'
export const FETCHING_FURNITURE_ERROR = 'FETCHING_FURNITURE_ERROR'
export const FETCHING_FURNITURE_SUCCESS = 'FETCHING_FURNITURE_SUCCESS'
export const ADD_FURNITURE = 'ADD_FURNITURE'
export const ADD_MULTIPLE_FURNITURES = 'ADD_MULTIPLE_FURNITURES'
export const REMOVE_FETCHING = 'REMOVE_FETCHING'
export const UPDATE_FURNITURE_FIELDS = 'UPDATE_FURNITURE_FIELDS'
export const EDIT_FURNITURE = 'EDIT_FURNITURE'
export const REMOVE_FURNITURE = 'REMOVE_FURNITURE'


// api
export const fetchFurniture = (furnitureId) => {
  return ref.child(`furnitures/${furnitureId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export const removeFurniture = (furnitureId) => {
  console.log(furnitureId)
  return ref.child(`furnitures/${furnitureId}`).remove()
}

export const fetchFurnitures = (callback) => {
  return Promise.resolve(ref.child('furnitures').on('value', (snapshot) => {
      console.log('fetch furnitures')
      const furnitures = snapshot.val() || {}
      callback({furnitures})
    }, (error) => {
      console.log("The read failed: " + error.code);
      return error.code
    })
  )
}

export const saveFurniture = (furniture) => {
  const { furnitureId, furniturePromise } = saveToFurnitures(furniture)

  return Promise.all([
    furniturePromise,
    //saveToUsersFurnitures(furniture, furnitureId),
  ]).then(() => ({...furniture, furnitureId}))
}

const saveToFurnitures = (furniture) => {
  const furnitureId = ref.child('furnitures').push().key
  const furniturePromise = ref.child(`furnitures/${furnitureId}`).set({...furniture, furnitureId})
  return {
    furnitureId,
    furniturePromise,
  }
}

const updateToFurniture = (data, id) => {
  // const furnitureId = ref.child('furnitures').push().key
  let updates = {
    [`furnitures/${id}`]: data
  }
  return ref.update(updates)
}

// const saveToUsersFurnitures = (furniture, furnitureId) => {
//   return ref.child(`usersDucks/${furniture.uid}/${furnitureId}`)
//     .set({...furniture, furnitureId})
// }

// Action Creators

export const updateFurnitureFields = (newFurnitureFields) => {
  return {
    type: UPDATE_FURNITURE_FIELDS,
    newFurnitureFields,
  }
}

const fetchingFurniture = () => {
  return {
    type: FETCHING_FURNITURE,
  }
}

const fetchingFurnitureError = (error) => {
  return {
    type: FETCHING_FURNITURE_ERROR,
    error: 'Error fetching Furniture b/c: ' + error,
  }
}

const fetchingFurnitureSuccess = (furniture) => {
  return {
    type: FETCHING_FURNITURE_SUCCESS,
    furniture,
  }
}

export const removeFetching = () => {
  return {
    type: REMOVE_FETCHING,
  }
}

const addFurniture = (furniture) => {
  return {
    type: ADD_FURNITURE,
    furniture,
  }
}

const editFurniture = (furniture, furnitureId) => {
  return {
    type: EDIT_FURNITURE,
    furniture,
    furnitureId,
  }
}

export const updateFurniture = (furniture, furnitureId) => {
  return (dispatch) => {
    updateToFurniture(furniture, furnitureId)
      .then(() => {
        dispatch(editFurniture(furniture, furnitureId))
      })
      .catch((err) => {
        if (err) console.log(err)
      })
  }
}

export const furnitureSubmit = (furniture) => {
  return (dispatch, getState) => {
    // const uid = getState().users.authedId
    saveFurniture(furniture)
      .then((furnitureWithId) => {
        dispatch(addFurniture(furnitureWithId))
        // dispatch(addSingleUsersFurniture(uid, furnitureWithId.furnitureId))
      })
      .catch((err) => {
        console.warn('Error in furnitureSubmit', err)
      })
  }
}

export const addMultipleFurnitures = (furnitures) => {
  return {
    type: ADD_MULTIPLE_FURNITURES,
    furnitures,
  }
}

export const removeOneFurniture = (furnitures) => {
  return {
    type: REMOVE_FURNITURE,
    furnitures
  }
}

export const fetchAndHandleFurnitures = () => {
  return (dispatch) => {
    console.log('fetch and handle furnitures')
    dispatch(fetchingFurniture())
    fetchFurnitures(({furnitures}) => {
      dispatch(addMultipleFurnitures(furnitures))
    })
      .then((furniture) => dispatch(fetchingFurnitureSuccess(furniture)))
      .catch((error) => dispatch(fetchingFurnitureError(error)))
  }
}

export const removeAndHandleFurniture = (furniture, id) => {
  return (dispatch) => {
    console.log('remove and handle furniture')
    removeFurniture(id)
      .then(() => dispatch(removeOneFurniture(furniture)))
      .catch((error) => console.log(error))
  }
}
