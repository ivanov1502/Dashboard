import React, {Component} from 'react';

import authProvider from './AuthProvider';
import {Admin, Resource} from 'react-admin';
import {UserList} from './users';
import Scheduler from "./scheduler/Scheduler";

import {PostList, PostEdit, PostCreate} from './posts';
import jsonServerProvider from 'ra-data-json-server';

import PostIcon from '@material-ui/icons/CalendarToday';
import UserIcon from '@material-ui/icons/AttachMoney';
import Dashboard from './Dashboard';



const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

class App extends Component {
      render() {
        return (
          <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
              <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
              <Resource name="users" list={UserList} icon={UserIcon} />
              <Scheduler/>
            </Admin>
        );
      }
    }


export default App;
