export const setDelta = (id) => ({
  type: 'SET_DELTA',
  payload: id
})

export const setUserDocuments = (documents) =>({
  type: 'SET_USER_DOCUMENTS',
  payload: documents
})

export const setDocument = (document_id) =>({
  type: 'SET_DOCUMENT',
  payload: document_id
})

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories
})

export const addCategory = (category) =>({
  type: 'ADD_CATEGORY',
  payload: category
})

export const addDocument = (document) =>({
  type: 'ADD_DOCUMENT',
  payload: document
})

export const removeDocument = (id) => ({
  type: 'REMOVE_DOCUMENT',
  payload: id
})
