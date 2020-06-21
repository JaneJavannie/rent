import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

const Info = () => {
    return (
        <Card>
            <Title title="Справка" />
            <CardContent>
                <div><a href='/info_guest.docx' download>Скачать инструкцию пользователя</a></div>
                <br/>
                <span>Правовое регулирование услуг проката осуществляется в соответствии с:<br/>
                </span>
                <ul>
                    <li><a href='http://docs.cntd.ru/document/9027703' download>Гражданский кодекс Российской Федерации</a></li>
                    <li><a href='http://docs.cntd.ru/document/9005388' download>О защите прав потребителей</a></li>
                    <li><a href='http://docs.cntd.ru/document/9047533' download>Об утверждении Правил бытового обслуживания населения в Российской Федерации</a></li>
                </ul>
            </CardContent>
        </Card>
    );
}

export default Info;
