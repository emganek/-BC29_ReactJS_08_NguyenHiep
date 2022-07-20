import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";
import { ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT, SAVE_EDITED_STUDENT } from "../Type/reactFormType";

const DEFAULT_STATE = {
    studentList: [
        {
            studentCode: 1,
            name: "Nguyen Van A",
            phoneNumber: "0123456789",
            email: "email@ghec.vn",
        },
        {
            studentCode: 2,
            name: "Nguyen Van B",
            phoneNumber: "0123456789",
            email: "nguyenvanB@ghec.vn",
        },
    ],
    selectedStudent: null,
}

export const reactFormReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case (ADD_STUDENT): {
            state.studentList = [...state.studentList, payload]
            return { ...state };
        }
            break;

        case (DELETE_STUDENT): {
            state.studentList = state.studentList.filter(ele => ele.studentCode !== payload.studentCode);
            return { ...state };
        }
            break;

        case (EDIT_STUDENT): {
            state.selectedStudent = payload;
            return { ...state };
        }
            break;

        case (SAVE_EDITED_STUDENT): {
            state.studentList = state.studentList.map(ele => ele.studentCode === payload.studentCode ? payload : ele);
            state.selectedStudent = null;
            return { ...state };
        }
            break;

        default: return { ...state }
            break;
    }
}