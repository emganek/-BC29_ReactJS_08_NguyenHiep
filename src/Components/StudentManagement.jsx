import React, { Component } from 'react';
import style from "./style.module.css";
import { connect } from 'react-redux';
import { deleteStudentAction, editStudentAction } from '../Store/Action/reactFormAction';

class StudentManagement extends Component {
    state ={
        keyword:"",
    }

    renderStudentList = () => {
        const filteredStudentList = this.props.studentList.filter(ele => ele.name.toLowerCase().trim().indexOf(this.state.keyword.toLowerCase().trim()) !== -1)

        return filteredStudentList.map((ele,index) => (
            <tr key={index} className={`${index % 2 === 0 && "bg-light"}`} >
                <td>{ele.studentCode}</td>
                <td>{ele.name}</td>
                <td>{ele.phoneNumber}</td>
                <td>{ele.email}</td>
                <td>
                    <button onClick={() =>{
                        this.props.dispatch(editStudentAction(ele));
                    }} className="btn btn-info mr-2">EDIT</button>

                    <button onClick={()=>{
                        this.props.dispatch(deleteStudentAction(ele));
                    }} className="btn btn-danger">DELETE</button>
                </td>
            </tr >
        ))
    }

    searchByKeyWord = evt =>{
        const value = evt.target.value;

        this.setState({
            keyword:value,
        })
    }

    render() {
        return (
            <>
                <div className="row mt-4 px-3 ">
                    <div className="col-2 ml-auto">
                        <div className={`${style.searchBar} form-group mb-0`}>
                            <input onChange={this.searchByKeyWord} type="text" className="form-control" placeholder="Tìm kiếm theo tên..." />
                            <span><i className="fas fa-search"></i></span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead className='bg-dark text-white text-bold'>
                            <tr>
                                <th>Mã SV</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderStudentList()}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.reactFormReducer }
}

export default connect(mapStateToProps, null)(StudentManagement)