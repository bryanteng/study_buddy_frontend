export const setDelta = (delta) => ({
  type: 'SET_DELTA',
  payload: delta
})

export const setUserDocuments = (documents) =>({
  type: 'SET_USER_DOCUMENTS',
  payload: documents
})

export const setDocument = (document_id) =>({
  type: 'SET_DOCUMENT',
  payload: document_id
})
