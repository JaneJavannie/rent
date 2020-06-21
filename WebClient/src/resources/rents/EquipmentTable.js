import React, {
    useState,
    useEffect,
    useCallback,
    FC,
    CSSProperties,
} from 'react';
import { SearchInput, translate, useVersion, useDataProvider, RichTextField, SaveButton, Loading, Toolbar,useUpdate, NumberInput, NumberField, ShowController, BooleanInput, useTranslate, ShowView, usePermissions, Create, ReferenceField, ReferenceArrayField, SingleFieldList, ChipField, useGetMany, ArrayInput, CheckboxGroupInput, ReferenceInput, AutocompleteInput, SelectInput, FormDataConsumer, AutocompleteArrayInput, ReferenceArrayInput, SelectArrayInput, SimpleFormIterator, required, List, Show, Edit, SimpleForm, TextInput, DateTimeInput, ReferenceManyField, EditButton, SimpleShowLayout, Datagrid, TextField, DateField } from 'react-admin';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, Chip } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import compose from 'recompose/compose';

import { Link } from 'react-router-dom';
import { stringify } from 'query-string';

import { useForm } from 'react-final-form';
import PropTypes from 'prop-types';
import {
    TopToolbar, Filter, CreateButton, ExportButton, Button, sanitizeListRestProps,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import { Fragment } from 'react';
import { useFormState } from 'react-final-form'
import { Route, Switch } from 'react-router';
import { Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
var moment = require('moment');

const EquipmentTable = (props) => {
    let record = props.record
    // const translate = useTranslate();

    // const eqRequest = useGetMany('equipment', equipmentIds);

    // let typesIds = [];
    // if (eqRequest.loaded) {
    //     typesIds = eqRequest.data.map((e) => e.equipmentTypeId);
    // }

    // const typesRequest = useGetMany('equipmentTypes', typesIds);

    // let allLoaded = (arr) => {
    //     if (!arr) {
    //         return false;
    //     }
    //     for (let i = 0; i < arr.length; i++) {
    //         if (!arr[i]) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // const loaded = equipmentIds.length == 0 || eqRequest.loaded && typesRequest.loaded && allLoaded(eqRequest.data) && allLoaded(typesRequest.data);
    // if (!loaded) {
    //     return <Loading />;
    // }

    const dataProvider = useDataProvider();

    
    const [state, setState] = useState({});
    const version = useVersion();
    const fetchData = useCallback(async () => {
        let equipmentIds = record.equipmentIds;
        if (!equipmentIds) {
            equipmentIds = [];
        }
    
        debugger
        const { data: equipment } = await dataProvider.getMany('equipment', {
            ids: equipmentIds,
        });

        const typesIds = equipment.map((e) => e.equipmentTypeId);
        const { data: equipmentTypes } = await dataProvider.getMany('equipmentTypes', {
            ids: typesIds,
        });
        
        let types = equipmentTypes.reduce(function (acc, cur, i) {
            acc[cur.id] = cur;
            return acc;
        }, {});

        let total = 0;


        const price = (type, from, to) => {
            var price = 0;
            if (type && from && to) {
                debugger
                from = moment(from);
                to = moment(to)
                if (to > from) {
                    let hours = Math.round(to.diff(from, 'hours', true))
                    if (hours < 6) {
                        price = hours * type.pricePerHour;
                    } else {
                        let days = to.diff(from, 'days');
                        if (days == 0) {
                            days = 1;
                        }
                        price = days * type.pricePerDay;
                    }
                }
            }
            return price;
        };

        const eqPrice = equipment.reduce(function (acc, cur, i) {
            acc[cur.id] = price(types[cur.equipmentTypeId], record.from, record.to);
            total += acc[cur.id];
            return acc;
        }, {});

        setState(state => ({
            ...state,
            equipmentTypes,
            equipment,
            eqPrice,
            total,
            types
        }));
    }, [dataProvider, record]);

    useEffect(() => {
        fetchData();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    // let types = typesRequest.data.reduce(function (acc, cur, i) {
    //     acc[cur.id] = cur;
    //     return acc;
    // }, {});

    // let total = 0;
    // const eqPrice = eqRequest.data.reduce(function (acc, cur, i) {
    //     acc[cur.id] = price(types[cur.id], record.from, record.to);
    //     total += acc[cur.id];
    //     return acc;
    // }, {});

    const {
        equipment,
        types,
        eqPrice,
        total
    } = state;

    if (!equipment || !types) {
        return <Loading />;
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>{translate('custom.rents.table.type')}</TableCell>
                        <TableCell>{translate('resources.equipment.fields.name')}</TableCell>
                        <TableCell>{translate('resources.equipment.fields.pricePerHour')}</TableCell>
                        <TableCell>{translate('resources.equipment.fields.pricePerDay')}</TableCell>
                        <TableCell>{translate('custom.rents.table.total')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {equipment.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row"><div>{row.id}</div></TableCell>
                            <TableCell><div>{types[row.equipmentTypeId] ? types[row.equipmentTypeId].name : ""}</div></TableCell>
                            <TableCell><div>{row.name}</div></TableCell>
                            <TableCell><div>{types[row.equipmentTypeId] ? types[row.equipmentTypeId].pricePerHour : ""}</div></TableCell>
                            <TableCell><div>{types[row.equipmentTypeId] ? types[row.equipmentTypeId].pricePerDay : ""}</div></TableCell>
                            <TableCell><div>{eqPrice[row.id]}</div></TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell><div><b>{total}</b></div></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default EquipmentTable;
