import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

var data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];

export default class Experiment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      data : ''
    };
    // this.onGetData = this.onGetData.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

  }
  
  componentDidMount(){
    var exp_id  = this.props.location.state.id;
    var req = {
      experiment_id : exp_id
    };
    axios.post("http://localhost:4000/booking/experimentdata", req)
    .then(response => {
        if(response.data.success === true)
        {
            console.log(response.data.data);
            this.setState({data : response.data.data});
        }
    });
  }


  // onSubmit(e)
  // {
  //   e.preventDefault();
  // }




    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/requestSession">Request Session    </Nav.Link>
                        <Nav.Link href="/sessionsList">Back to sessions list    </Nav.Link>
                        
                        {/* <Nav.Link href="/sessionHistory">Session History    </Nav.Link> */}
                        {/* <Navbar.Brand href="/startSession">Start Session    </Navbar.Brand> */}
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <br/>
                <br/>
                <h1>Experiment {this.state.data.name}</h1>
                <br/>
                <br/>
                <div class = "graph">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>     
                </div>
                
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Voltage</th>
                        <th>Theoretical RPM</th>
                        <th>Observed RPM</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}