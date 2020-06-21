import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider/dataProvider';
import i18n from './i18n/ru';
import MyLayout from './apps/guest/layout/MyLayout';
import equipment from './apps/guest/resources/equipment';
import equipmentTypes from './resources/equipmentTypes';
import shops from './resources/shops';
import { Route } from 'react-router-dom';
import Info from './apps/guest/customRoutes/Info';

var customRoutes = [
    <Route exact path="/info" component={Info} />,
]

const App = () => (
    <Admin dataProvider={dataProvider} i18nProvider={i18n} layout={MyLayout} customRoutes={customRoutes} >
        <Resource name="guest/equipment" {...equipment} />
        <Resource name="equipmentTypes"/>
        <Resource name="shops" list={shops.list} />
    </Admin>
);

export default App;
