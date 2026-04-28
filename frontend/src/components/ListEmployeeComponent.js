import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import EmployeeService from "../services/EmployeeService";
import './ListEmployeeComponent.css';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            getAllEmployees();

        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <h2 className="text-center h2-custom">Employee Directory</h2>
            <Link to="/add-employee" className="btn btn-primary mb-2"> Add Employee </Link>
            <table className="table table-bordered table-stripped">
                <thead>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Location</th>
                    <th>Actions</th>
                </thead>

                <tbody> {
                    employees.map((employee) => (
                        <tr key={employee.id} >
                            <td> {employee.id} </td>
                            <td> {employee.firstName} </td>
                            <td> {employee.lastName} </td>
                            <td> {employee.emailId} </td>
                            <td> {employee.location} </td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-employee/${employee.id}`} >Edit</Link>
                                <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}
                                    style={{ marginLeft: "10px" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ListEmployeeComponent;