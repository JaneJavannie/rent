import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

const Info = () => {
    return (
        <Card>
            <Title title="Справка" />
            <CardContent>
                <div><a href='/info_guest.docx' download>Скачать инструкцию сотрудника</a></div>
            </CardContent>
        </Card>
    );
}

export default Info;
