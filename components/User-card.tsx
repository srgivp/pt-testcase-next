import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import { mdiAccountEditOutline, mdiDeleteForeverOutline } from '@mdi/js';
import {IconButton} from "@material-ui/core";
import Icon from '@mdi/react';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '20px'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1px',
        boxShadow:  '0px 13px 13px #ebf2f5'
},
header: {
        width: '100%',
}
}));

export type UserCardProps = {
    name: string,
    lastname: string,
    id: any,
    key?: string,
    img: string,
    orderNumber: number
}


const UserCard = (props: UserCardProps)=>{
    const classes = useStyles();
    const userName=`${props.name} ${props.lastname}`;
        return <Card id ={props.id} className={`${classes.root} card`}>
            <CardActions disableSpacing className={classes.actions}>
                <IconButton aria-label='edit card'
                >
                    <Icon path={mdiAccountEditOutline}
                          title="edit card"
                          size={1}
                          horizontal
                          rotate={180}
                          vertical
                          color="#f5d442"
                    />
                </IconButton>
                <IconButton aria-label='delete card'
                >
                    <Icon path={mdiDeleteForeverOutline}
                          title="delete card"
                          size={1}
                          horizontal
                          rotate={180}
                          vertical
                          color="red"/>
                </IconButton>
            </CardActions>
            <Avatar alt={`${props.name} ${props.lastname}`} src={props.img} className={classes.large}/>
            <CardHeader className={classes.header} title={userName} />
        </Card>
    }

UserCard.propTypes = {
    name: PropTypes.string,
    lastname: PropTypes.string,
    id: PropTypes.string,
    img: PropTypes.string
}

export default UserCard;
