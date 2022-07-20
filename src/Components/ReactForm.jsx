import React, { Component } from 'react'
import StudentForm from './StudentForm'
import StudentManagement from './StudentManagement'

export default class ReactForm extends Component {
  render() {
    return (
      <div>
        <StudentForm />
        <StudentManagement />
      </div>
    )
  }
}
