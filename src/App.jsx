import React, { useState, useEffect } from 'react';
import { bridge, axios } from 'fm-bridge';
import { DataGrid, Text, Loader } from 'hoi-poi-ui';
// import CONSTANTS from './constants';
import './App.scss';

function App() {
  const [context, setContext] = useState();
  const [statusLogData, setstatusLogData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [usersData, setUsersData] = useState();
  const [opportinityChangeLog, setOpportinityChangeLog] = useState();
  const [opportunityStatuses, setOpportunityStatuses] = useState();

  useEffect(() => {
    bridge
      .getContext()
      .then((res) => {
        setContext(res);
      })
      .catch((err) => console.warn(err));
  }, []);

  const getUser = () => {
    return axios
      .get('/users/')
      .then((data) => {
        // get status
        setUsersData(data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsLoading(false);
      });
  };
  const getOpportunityStatuses = () => {
    return axios
      .get('/opportunityStatuses/')
      .then((opportunityStatuses) => {
        // get status
        setOpportunityStatuses(opportunityStatuses);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsLoading(false);
      });
  };
  const getOpportunityStatusChangelog = () => {
    return axios
      .post('/procedure/opportunityStatusChangelog', { opportunityId: context.entityId })
      .then(async (opportunityData) => {
        setOpportinityChangeLog(opportunityData);
        await getUser();
        console.log('getUser');
        await getOpportunityStatuses();
        console.log('getOpportunityStatuses');
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsLoading(false);
      });
  };

  // get users
  useEffect(() => {
    if (context === undefined) return;
    setError(false);
    setIsLoading(true);
    // by default load entity ID 106 id context is empty
    if (context.entityId === '') context.entityId = '106';

    getOpportunityStatusChangelog();
  }, [context]);

  useEffect(() => {
    if (
      usersData !== undefined &&
      opportunityStatuses !== undefined &&
      opportinityChangeLog !== undefined
    ) {
      try {
        let rowData = [];
        opportinityChangeLog.forEach((item) => {
          const user = usersData.find((user) => user.id === item.salesRepId);
          const status = opportunityStatuses.find((status) => status.id === item.statusId * 1);
          const dateTime = new Date(item.dateCreated);
          const date =
            dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear();
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
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setIsLoading(false);
      }
    }
  }, [usersData, opportunityStatuses, opportinityChangeLog]);

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
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ height: 360 }}>
          <DataGridManager />
        </div>
      )}
    </div>
  );
}

export default App;
