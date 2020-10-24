import React,{Component} from 'react';
import axios from 'axios';
import { Layout, Table, Breadcrumb, Button } from 'antd';
class BusTimeDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: 'PlayerName',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>
            },{
                title: 'Player level',
                dataIndex: 'num',
                key: 'num'
            },{
                title: 'Game Time',
                dataIndex: 'GameTime',
                key: 'GameTime'
            },{
                title: 'Killed',
                dataIndex: 'killed',
                key: 'killed'
            },{
                title: 'Death',
                dataIndex: 'death',
                key: 'death'
            }, {
                title: 'Assist',
                dataIndex: 'assist',
                key: 'assist'
            },{
                title:'Gold',
                dataIndex:'gold',
                key:'gold'
            }

            ]
        }
    }

    render() {
        const {
            dataSource,
            columns
        } = this.state;
        return(
            <div className='bus-time-day'>
                <Layout>
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>BusTime</Breadcrumb.Item>
                        <Breadcrumb.Item>Day</Breadcrumb.Item>
                    </Breadcrumb>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                    ></Table>
                </Layout>
            </div>
        )
    }
}
export default BusTimeDay;

componentDidMount() {
    const _this = this;
    axios.get('http://5d674a716847d40014f65eda.mockapi.io/api/dataSourceDay')
        .then(function(response) {
            _this.setState({
                dataSource: response.data,
                isLoaded: true
            });
        });
.catch(function(error) {
        _this.setState({
            isLoaded: false,
            error: error
        });
    });
}