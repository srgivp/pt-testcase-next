import React from 'react';
import UserCard from "../../../components/User-card";
import PropTypes from 'prop-types';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {UsersItem} from "../../../components/types-components";
// import {clearUsersInfo, fetchUsersRequest} from "../actions/fetch-users-actions";
import {State} from "../../../redux/reducers/root-reducer";
import {wrapper} from "../../../redux/store";
import cookies from "next-cookies";
import {authSuccess} from "../../../redux/actions/auth-actions";
import {fetchUsersFromApi} from "../../../support/axios";
import {fetchUsersError, fetchUsersSuccess} from "../../../redux/actions/fetch-users-actions";
import Processing from "../../../components/Processing";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        margin: '0',
        padding: '5px',
        maxWidth: '100%'
    }
}));

const UsersContainer = (props) => {
    const state: State = typeof window === 'undefined' ? props : useSelector((state: State) => state);
    const classes = useStyles();

    const userCardsGenerator = (): JSX.Element[] => {
        let cardsArr: JSX.Element[] = [];
        state.users.info.forEach((item: UsersItem, index: number) => {
            const userCard: JSX.Element = (
                <UserCard orderNumber={index} key={item.id.toString()} name={item.firstName} lastname={item.lastName}
                          id={item.id.toString()}
                          img={item.picture}/>);
            cardsArr.push(userCard);
        })
        return cardsArr;
    }

    return <>{state.users.loading ? <Processing/> :
        <Container className={`flex-container, ${classes.root} users-container`}>
            {userCardsGenerator()}
        </Container>}</>

}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    // @ts-ignore
    const {token} = cookies(ctx);
    const {dispatch} = ctx.store;
    console.log('dispatchink token', token);
    console.log('paramsnumber: ', ctx.params.number);
    // @ts-ignore
    dispatch(authSuccess({token}));

    try {
        const pageNumber = Number(ctx.params.number);
        console.log('pageNumber: ', pageNumber);
        let response = await fetchUsersFromApi(pageNumber-1, token);
        const {usersPortion, total} = response;
        dispatch(fetchUsersSuccess({usersPortion, total, pageNumber}));
    } catch (error) {
        const errorJson = {message: error.toJSON().message};
        dispatch(fetchUsersError({error: errorJson}));
    }
    const state = ctx.store.getState();
    return {
        props: state
    }
})

UsersContainer.propTypes = {
    users: PropTypes.array
}

export default UsersContainer;