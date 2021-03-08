const ROUTES = {
    signIn: '/sign-in',
    signUp: '/sign-up',
    dynamic: {
        usersPage: (number: number | string = ':number') => `/users-page/${number}`,
        //user: (number: number | string = ':number', id = ':id') => `/users-page/${number}/user/${id}`,
    }
}

export default ROUTES;