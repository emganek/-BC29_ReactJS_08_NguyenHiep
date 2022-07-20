import { ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT, SAVE_EDITED_STUDENT } from "../Type/reactFormType";

export const onSubmitHandlerAction = (payload) => ({
  type: ADD_STUDENT,
  payload
})

export const deleteStudentAction = (payload) => ({
  type: DELETE_STUDENT,
  payload
})

export const editStudentAction = (payload) => ({
  type: EDIT_STUDENT,
  payload
})

export const saveEditedStudentAction = (payload) => ({
  type: SAVE_EDITED_STUDENT,
  payload
})
