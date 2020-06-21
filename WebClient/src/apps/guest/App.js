import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider/dataProvider';
import i18n from './i18n/ru';
import MyLayout from './guest/layout/MyLayout';
import equipment from './apps/guest/resources/equipment';
import equipmentTypes from './resources/equipmentTypes';
import shops from './resources/shops';


const App = () => (
    <Admin dataProvider={dataProvider} i18nProvider={i18n} layout={MyLayout} >
        <Resource name="guest/equipment" {...equipment} />
        <Resource name="equipmentTypes" /* list={equipmentTypes.list} /> */ />
        <Resource name="shops" list={shops.list} />
    </Admin>
);

export default App;
