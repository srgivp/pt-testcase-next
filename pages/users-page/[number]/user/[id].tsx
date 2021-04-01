import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { IconButton } from '@material-ui/core';
import { Avatar, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ForwardIcon from '@material-ui/icons/Forward';
import Button from '@material-ui/core/Button';
import { State } from '../../../../redux/reducers/root-reducer';
import {
  cleanDetailsInfo,
  fetchDetailsError,
  fetchDetailsSuccess,
} from '../../../../redux/actions/fetch-details-actions';
import { onChangeDateOfBirth, onChangeAge } from '../../../../components/support/user-info-utils';
import { wrapper } from '../../../../redux/store';
import { fetchDetailsFromApi } from '../../../../support/axios';
import { editUserAction } from '../../../../redux/actions/fetch-users-actions';
import nookies from 'nookies';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

interface PropsAge {
  years: number;
}

export type UserInfoFormData = {
  age: number;
  dateOfBirth: Date;
  firstName: string;
  lastName: string;
  picture: string;
  title: string;
  id: string;
};

const Age = (props: PropsAge) => {
  return <div>{props.years}</div>;
};

const UserInfo = props => {
  const state = typeof window === 'undefined' ? props.state : useSelector((state: State) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<UserInfoFormData>(/*{defaultValues: {years: 0}}*/);
  let age: number;
  let dateOfBirth: Date;
  if (state.user.info) {
    age = watch('age', state.user.info.age);
    dateOfBirth = watch('dateOfBirth', new Date(state.user.info.dateOfBirth));
  }
  useEffect(() => {
    return () => {
      dispatch(cleanDetailsInfo());
    };
  }, []);

  return (
    <>
      {' '}
      {state.user.info ? (
        <div id="user-info" className="form-container">
          <IconButton
            aria-label="get back"
            id="get-back"
            onClick={() => {
              dispatch(cleanDetailsInfo());
              window.history.back();
            }}
          >
            <ForwardIcon className="turn180" color="primary" style={{ fontSize: 75 }} rotate={180} />
          </IconButton>
          <div>
            <Avatar
              alt={`${state.user.info.firstName} ${state.user.info.lastName}`}
              src={state.user.info.picture}
              className={classes.large}
            />
          </div>
          <form
            id="user-form"
            onSubmit={handleSubmit(data => {
              data.id = state.user.info.id;
              const details = data;
              dispatch(editUserAction(details));
              window.history.back();
            })}
          >
            <div className="form-group">
              <label htmlFor="firstName">Firstname: </label>
              <input
                className="textInput"
                name="firstName"
                type="firstName"
                ref={register}
                defaultValue={state.user.info.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Lastname: </label>
              <input
                className="textInput"
                name="lastName"
                type="lastName"
                ref={register}
                defaultValue={state.user.info.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <select name="title" ref={register}>
                <option className="title-selection" value={state.user.info.title} selected={true}>
                  {state.user.info.title}
                </option>
                <option className="title-selection" value="miss">
                  miss
                </option>
                <option className="title-selection" value="mrs">
                  mrs
                </option>
                <option className="title-selection" value="mr">
                  mr
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age: </label>
              <Age years={age} />
            </div>

            <div className="form-group">
              <label htmlFor="age">Change age: </label>
              <Controller
                name="age"
                control={control}
                render={() => (
                  <Slider
                    defaultValue={state.user.info ? state.user.info.age : 5}
                    onChange={(event, value: number | number[]) => {
                      onChangeAge(event, value, setValue);
                    }}
                    step={1}
                    max={150}
                    valueLabelDisplay="auto"
                  />
                )}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Birthday date: </label>
              <Controller
                name="dateOfBirth"
                type="dateOfBirth"
                defaultValue={new Date(state.user.info.dateOfBirth)}
                control={control}
                render={() => (
                  <DatePicker
                    name="dateOfBirth"
                    selected={dateOfBirth}
                    onChange={(date: Date) => {
                      onChangeDateOfBirth(date, setValue);
                    }}
                  />
                )}
              />
            </div>
            <Button type="submit" id="save" className="action-button" variant="contained" size="medium">
              Save
            </Button>
          </form>
        </div>
      ) : (
        <div>There is no information about separate user</div>
      )}{' '}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const allCookies = nookies.get(ctx);
  const shallowCookies = JSON.parse(JSON.stringify(allCookies));
  const { token, apiKey } = shallowCookies;
  const state = ctx.store.getState();
  const id: string = typeof ctx.params.id === 'string' && ctx.params.id;
  const dispatch = ctx.store.dispatch;
  if (state.users.info.length < 1) {
    try {
      const details = await fetchDetailsFromApi(id, token, apiKey);
      dispatch(fetchDetailsSuccess(details));
    } catch (error) {
      const errorJson = { message: error.toJSON().message };
      dispatch(fetchDetailsError({ error: errorJson }));
    }
  }
  const newState = ctx.store.getState();
  return {
    props: {
      state: newState,
    },
  };
});

export default UserInfo;
