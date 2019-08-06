import React, {Component} from 'react'
import {
    Table,
  } from 'reactstrap';
  import {Row} from './RiderRow.jsx';

  

export default class AdminTable extends Component{
  constructor(props){
    super(props)
    
    this.state = {
      data: [
        {saccoName: "Morris Ouma", registeredDate: '12/06/2017', status: 'Active', contacts: '07078957867', idNo: "45374634"}, 
        {saccoName: "Wycliffe Odero", registeredDate: '12/12/2018', status: 'Deactivated', contacts: '0778456322', idNo: "56643457"}, 
        {saccoName: "Fredrick Masese", registeredDate: '02/07/2019', status: 'Active', contacts: '0789467325', idNo: "245536263"},
        
      ],

    }
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }
  
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
  }
}
compareBy2(key) {
  return function (a, b) {
    if (a[key] < b[key]) return 1;
    if (a[key] > b[key]) return -1;
    return 0;
}
}


 
  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
  }
  
  sortBy2(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy2(key));
    this.setState({data: arrayCopy});
  }
  
    render(){
      // const revsort = ()
      const rows = this.state.data.map( (rowData) => <Row {...rowData} />);
        return(

            <Table className="align-items-center table-flush" responsive>
            <thead className="thead-dark">
            <tr>
            <th style={{color:"white"}}  scope="col"> 
                <i className="ni ni-bold-up" onClick={() => this.sortBy('saccoName')} /> <br/>
                <i className="ni ni-bold-down" onClick={() => this.sortBy2('saccoName')} />
                Sacco Name
            </th>
                <th style={{color:"white"}} scope="col">Registered Date</th>

                <th  style={{color:"white"}} scope="col"> 
                <i className="ni ni-bold-up" onClick={() => this.sortBy('status')} /> <br/>
                <i className="ni ni-bold-down" onClick={() => this.sortBy2('status')} />
                Status
                </th>
                <th style={{color:"white"}}  scope="col"> 
                <i className="ni ni-bold-up" onClick={() => this.sortBy('contacts')} /> <br/>
                <i className="ni ni-bold-down" onClick={() => this.sortBy2('contacts')} />
                Contacts
                </th>
                <th  style={{color:"white"}} scope="col"> 
                <i className="ni ni-bold-up" onClick={() => this.sortBy('idNo')} /> <br/>
                <i className="ni ni-bold-down" onClick={() => this.sortBy2('idNo')} />
                ID Number
                </th>
                
                <th />
                
              </tr>
              
            </thead>
            {rows}
           </Table>
        )
    }
}


