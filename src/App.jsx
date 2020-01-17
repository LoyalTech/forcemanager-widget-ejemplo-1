import React, { useState, useEffect } from 'react';
import { bridge, axios } from 'fm-bridge';
import { DataGrid, Text, Button, Loader } from 'hoi-poi-ui';
import CONSTANTS from './constants';
import './App.scss';

function App() {
  const [context, setContext] = useState();
  const [statusLogData, setstatusLogData] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    bridge
      .getContext()
      .then((res) => {
        setContext(res);
      })
      .catch((err) => console.warn(err));
  }, []);

  // get users
  useEffect(() => {
    if (context === undefined) return;
    setError(false);

    axios
      .get('/users/')
      .then((usersData) => {
        const users = usersData;
        // get status
        axios
          .get('/opportunityStatuses/')
          .then((opportunityStatuses) => {
            console.log(context);
            const statuses = opportunityStatuses;
            // get logs
            axios
              .post('/procedure/opportunityStatusChangelog', { opportunityId: '106' })
              .then((opportunityData) => {
                let rowData = [];
                opportunityData.forEach((item) => {
                  const user = users.find((user) => user.id === item.salesRepId);
                  const status = statuses.find((status) => status.id === item.statusId * 1);
                  const dateTime = new Date(item.dateCreated);
                  const date =
                    dateTime.getDate() +
                    '/' +
                    (dateTime.getMonth() + 1) +
                    '/' +
                    dateTime.getFullYear();
                  const time =
                    dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
                  rowData.push({
                    user: user.name,
                    status: status.descriptionEN,
                    date: date + ' ' + time,
                  });
                });
                if (rowData.length === 0) {
                  throw new Error('Error');
                }

                setstatusLogData(rowData);
              })
              .catch((err) => {
                setError(true);
              });
          })
          .catch((err) => {
            setError(true);
          });
      })
      .catch((err) => {
        setError(true);
      });
  }, [context]);

  const DataGridManager = (props) => {
    if (error) {
      return <Text>No hay cambios de estado</Text>;
    } else {
      return (
        <DataGrid
          columnDefs={[
            {
              headerName: 'User',
              field: 'user',
            },
            {
              headerName: 'Status',
              field: 'status',
            },
            {
              headerName: 'Date',
              field: 'date',
            },
          ]}
          rowData={statusLogData}
        />
      );
    }
  };

  return (
    <div className="App">
      <div style={{ height: 360 }}>
        <DataGridManager />
      </div>
    </div>
  );
}

export default App;
