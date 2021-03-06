import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import authProvider from './authProvider/authProvider';
import dataProvider from './dataProvider/dataProvider';
import i18n from './i18n/ru';
import MyLayout from './layout/MyLayout';
import employees from './resources/employees';
import equipment from './resources/equipment';
import equipmentTypes from './resources/equipmentTypes';
import rents from './resources/rents';
import shops from './resources/shops';
import shopReducer from './shopSelector/shopReducer';
import Info from './apps/emp/customRoutes/Info';

var customRoutes = [
    <Route exact path="/info" component={Info} />,
]

const App = () => (
    <Admin customReducers={{ shop: shopReducer }} customRoutes={customRoutes} layout={MyLayout} 
        dataProvider={dataProvider} authProvider={authProvider} i18nProvider={i18n}>

        <Resource name="rents" {...rents} />
        <Resource name="equipment" {...equipment}/>
        <Resource name="equipmentTypes" list={equipmentTypes.list} />
        <Resource name="employees" {...employees} />
        <Resource name="shops" list={shops.list} />

    </Admin>
);

export default App;
