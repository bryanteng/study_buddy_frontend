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

export const removeNotecard = (id) => ({
  type: 'REMOVE_NOTECARD',
  payload: id
})

export const setCurrentDeck = (deck) => ({
  type: 'SET_CURRENT_DECK',
  payload: deck
})

export const addNotecardCategory = (category) => ({
  type: 'ADD_NOTECARD_CATEGORY',
  payload: category
})

export const addNotecardSubcategory = (subcategory) => ({
  type: 'ADD_NOTECARD_CATEGORY',
  payload: subcategory
})

export const removeNotecardFromDeck = (id) => ({
  type: 'REMOVE_NOTECARD_FROM_DECK',
  payload: id
})
