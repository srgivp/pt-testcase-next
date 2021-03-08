export const actionSampleWoPayload = (type: string) => {
    return () => {
return {type}
    }
}

export const actionSamplePayload = (type: string) => {
    return (payload) => {
        return {
            type,
            payload
        }
    }
}

export const actionAsyncSamplePayload = (type: string) => {
    return (payload) => async (dispatch) => {
        dispatch({
            type,
            payload
        })
    }
}