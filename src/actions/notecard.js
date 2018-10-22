export const addNotecard = (notecard) => ({
  type: 'ADD_NOTECARD',
  payload: notecard
})

export const setNotecards = (notecards) =>({
  type: 'SET_NOTECARDS',
  payload: notecards
})

export const setNotecardCategories = (categories) => ({
  type: 'SET_NOTECARD_CATEGORIES',
  payload: categories
})

export const setNotecardSubCategories = (subcategories) => ({
  type: 'SET_NOTECARD_SUBCATEGORIES',
  payload: subcategories
})
