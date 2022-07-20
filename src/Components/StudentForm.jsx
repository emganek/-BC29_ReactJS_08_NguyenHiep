import React, { Component, createRef } from 'react';
import { onSubmitHandlerAction, saveEditedStudentAction } from '../Store/Action/reactFormAction';
import { connect } from "react-redux";

const DEFAULT_VALUE = {
    studentCode: "",
    name: "",
    phoneNumber: "",
    email: "",
}
class StudentForm extends Component {
    formRef = createRef();
    state = {
        values: { ...DEFAULT_VALUE },
        errors: {
            studentCode: "",
            name: "",
            phoneNumber: "",
            email: "",
        },
        isEditing: false,
    }

    onChangeHandler = (evt) => {
        const { value, name } = evt.target;

        const updatedValues = { ...this.state.values, [name]: value };

        this.setState({
            values: updatedValues,
        })


    }

    onBlurHandler = (evt) => {
        const { name, title, type, value } = evt.target;
        const { valueMissing, patternMismatch } = evt.target.validity;
        let errorMessage = "";

        if (type === "email" && patternMismatch) {
            errorMessage = `${title} chưa đúng định dạng.`;
        }

        if (name === "phoneNumber" && patternMismatch) {
            errorMessage = `${title} phải có 10 chữ số và không được chứa chữ hay ký tự đặc biệt.`;
        }

        if (name === "studentCode" && this.state.isEditing === false) {
            const index = this.props.studentList.findIndex(ele => ele.studentCode == value);
            if (index !== -1) {
                errorMessage = `${title} đã tồn tại.`;
            }
        }

        if (valueMissing) {
            errorMessage = `${title} đang trống.`;
        }

        const updatedErrors = { ...this.state.errors, [name]: errorMessage };

        this.setState({
            errors: updatedErrors,
        })
    }

    onSubmitHandler = (evt) => {
        evt.preventDefault();

        if (!evt.target.checkValidity()) {
            return
        }

        if (this.state.isEditing) {
            //SAVE EDITED SINH VIEN
            this.props.dispatch(saveEditedStudentAction(this.state.values));
            this.setState({
                isEditing: false,
            })
        }
        else {
            //THEM SINH VIEN
            this.props.dispatch(onSubmitHandlerAction(this.state.values));
        }

        //Reset form
        this.setState({
            values: { ...DEFAULT_VALUE },
        }, () => {
            this.forceUpdate();
        })
    }

    //Catch event change of props or state
    static getDerivedStateFromProps(nextProps, currentState) {
        if (nextProps.selectedStudent !== null && currentState.values.studentCode !== nextProps.selectedStudent.studentCode) {
            currentState.errors = { ...DEFAULT_VALUE };
            currentState.values = nextProps.selectedStudent;
            currentState.isEditing = true;
        }
        return currentState;
    }

    render() {
        const { studentCode, name, phoneNumber, email } = this.state.values || {};
        let isValid = false;
        if (this.formRef.current) {
            isValid = this.formRef.current.checkValidity();
        }

        return (
            <div className="card p-0">
                <div className="card-header bg-dark text-white font-weight-bold">
                    <h3>Thông tin sinh viên</h3>
                </div>
                <div className="card-body">
                    <form ref={this.formRef} noValidate onSubmit={this.onSubmitHandler}>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Mã sinh viên</label>
                                    <input disabled={this.state.isEditing} value={studentCode} onBlur={this.onBlurHandler} onChange={this.onChangeHandler} required title="Mã số sinh viên" name="studentCode" type="number" className="form-control" />
                                    {this.state.errors.studentCode && <span className='text-danger'>{this.state.errors.studentCode}</span>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Họ và tên</label>
                                    <input value={name} onBlur={this.onBlurHandler} onChange={this.onChangeHandler} required title="Họ và tên" name="name" type="text" className="form-control" />
                                    {this.state.errors.name && <span className='text-danger'>{this.state.errors.name}</span>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input value={phoneNumber} onBlur={this.onBlurHandler} onChange={this.onChangeHandler} required title="Số điện thoại" name="phoneNumber" type="text" pattern='[0-9]{10}\b' className="form-control" />
                                    {this.state.errors.phoneNumber && <span className='text-danger'>{this.state.errors.phoneNumber}</span>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onBlur={this.onBlurHandler} onChange={this.onChangeHandler} required title="Email" name="email" type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$" className="form-control" />
                                    {this.state.errors.email && <span className='text-danger'>{this.state.errors.email}</span>}
                                </div>
                            </div>
                        </div>
                        <button disabled={!(this.formRef.current?.checkValidity() && this.state.errors.studentCode === "" && this.state.errors.phoneNumber === "")} className="btn btn-success mr-2">Thêm sinh viên</button>
                        <button type="reset" className="btn btn-outline-dark">RESET</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.reactFormReducer }
}

export default connect(mapStateToProps)(StudentForm)