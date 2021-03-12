import React from 'react';
import UserCard from "../../../components/User-card";
import PropTypes from 'prop-types';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import {UsersItem} from "../../../components/types-components";
import {State} from "../../../redux/reducers/root-reducer";
import {wrapper} from "../../../redux/store";
import {authSuccess} from "../../../redux/actions/auth-actions";
import {fetchUsersFromApi} from "../../../support/axios";
import {fetchUsersError, fetchUsersSuccess} from "../../../redux/actions/fetch-users-actions";
import Processing from "../../../components/Processing";
import nookies from 'nookies';


const useStyles = makeStyles(() => ({
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

    const userCardsGenerator = (): JSX.Element[] => state.users.info.map((item: UsersItem, index: number) => (
      <UserCard orderNumber={index} key={item.id.toString()} name={item.firstName} lastname={item.lastName}
                id={item.id.toString()}
                img={item.picture}/>))

    return <>{state.users.loading ? <Processing/> :
        <Container className={`flex-container, ${classes.root} users-container`}>
            {userCardsGenerator()}
        </Container>}</>

}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const allCookies = nookies.get(ctx);
    const shallowCookies = JSON.parse(JSON.stringify(allCookies));
    const {token} = shallowCookies;
    const {dispatch} = ctx.store;
    // @ts-ignore
    dispatch(authSuccess({token}));

    try {
        const pageNumber = Number(ctx.params.number);
        const response = await fetchUsersFromApi(pageNumber-1, token);
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
    users: PropTypes.object
}

export default UsersContainer;