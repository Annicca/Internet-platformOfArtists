import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { detailCompetition, detailGroup } from "../../Constant";
import { Image } from "../img/Image";
import { changeStatus } from "../helpers/changeStatus";
import { getRequestConfig } from "../helpers/getRequestConfig";

import './DetailStatement.scss';

export const DetailStatement = () =>{

    let navigate = useNavigate();
    const store = require('store');
    const userAuth = store.get('user');

    const params = useParams();
    const current = params.id;
    const [statement, setStatement] = useState();
    let group = 1;
    let accept = 1;
    let reject = 2;

    const apiUrl = `https://localhost:44344/api/statementes/${current}`;
    const [statementData, setStatementData] = useState();
    const [titles, setTitles] = useState();
    const [isStatus, setStatus] = useState(true);

    const change = (idStatement, idStatus, setStatementData) => {
        changeStatus(idStatement, idStatus, setStatementData)
        .then(() => navigate('/statements'))
    }
    useEffect(() => {
        if(userAuth?.idRole != 1){
            navigate(`/notfound`)
        } else{
            const getStatementAdmin = async() => {
            await axios.get(apiUrl, getRequestConfig()).then((resp) => {
                console.log(resp.data);
                setStatement(resp.data);

                if(resp.data.idType == group){
                    setStatementData([resp.data.user.surnameUser +" " + resp.data.user.nameUser +" " + resp.data.user.patronimycUser, resp.data.user.mailUser, resp.data.name, resp.data.city, resp.data.address]);
                    setTitles(detailGroup);
                } else{
                    setStatementData([resp.data.user.surnameUser +" " + resp.data.user.nameUser +" " + resp.data.user.patronimycUser, resp.data.user.mailUser, resp.data.name, resp.data.city, resp.data.dateStart.split('T')[0], resp.data.dateFinish.split('T')[0]]);
                    setTitles(detailCompetition);
                }
                if(resp.data.idStatusStatement == null){
                    setStatus(false)
                }
                
            }).catch((error) => console.log(error));
        }
        getStatementAdmin();
        }
      }, []); 

    const classnames = {
        main: 'main-container',
        title: 'main-container-user statement-title',
        detail: 'main-container-form',
        childFirst: 'main-container-form-child1',
        childSecond: 'main-container-form-child2',
        child1Element: 'main-container-form-child1-item',
        description: 'description-statement',
        descriptionTitle: 'description-statement__title',
        descriptionText: 'description-statement__text',
        buttonContainer: 'main-container-form-child2-box',
        button: 'description-statement__button',
        imgStatus: 'description-statement__img-status'
    }

    return(
        <div className={classnames.main}>
            {statement === undefined ? (<span>Loading...</span>) :
                <p className={classnames.title}> 
                    {'???????????? ???' + statement.idStatement}
                    <span>
                    {statement.idStatusStatement != null && statement.idStatusStatement == accept ?
                        <Image src="./icons/acceptActive.svg" alt = "??????????????" width={35} height={35} className={classnames.imgStatus} />
                        : <> </>}
                    </span>
                    <span>
                    {statement.idStatusStatement != null && statement.idStatusStatement == reject ?
                        <Image src="./icons/delActive.svg" alt = "??????????????" width={35} height={35} className={classnames.imgStatus} />
                        : <> </>}
                    </span>
                </p>}
            <div className = {classnames.detail}>
                <div className = {classnames.childFirst}>
                    {titles == undefined ? <> </> : titles.map((item,index) =>
                        <p key = {index} className = {classnames.child1Element}>
                            <span>{item}</span>
                        </p>
                    )}
                </div>
                <div className={classnames.childSecond} >
                    {statementData == undefined ? <> </> : statementData.map((item,index) =>
                        <p key = {index} className = {classnames.child1Element}>
                            <span>{item}</span>
                        </p>
                    )}
                </div>
            </div>
            {statement == undefined ? <></> : 
            <div className={classnames.description}>
                <p className={classnames.descriptionTitle}>????????????????:</p>
                <p className={classnames.descriptionText}>{statement.description}</p>
            </div>}
            <div className={classnames.buttonContainer}>
                <Link to = {'/statements'}><button className={classnames.button}>??????????</button></Link>
                <button className={classnames.button} disabled = {isStatus} onClick={() => change(statement.idStatement, accept)}>??????????????</button>
                <button className={classnames.button} disabled = {isStatus} onClick={() => change(statement.idStatement, reject)}>??????????????????</button>
            </div>
        </div>
    )
}