export default class GenClass {

    static async singleRedirect(singleId, dispatch, history, setLoadState) {
        await setLoadState(true);
        history.push(`/songs/${singleId}`);
    }

    //pre-loads data for user page
    static async userRedirect(userId, history) {
        // await dispatch(getLoad(true));
        // eslint-disable-next-line no-eval
        const hexId = await eval((userId + 79) * 7678831).toString(16);
        history.push(`/users/${hexId}`);
    }
}