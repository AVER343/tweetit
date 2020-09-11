import { store } from "../store";

export function getJWT() {
    const state = store.getState();

    const authToken = state.user.token
    return authToken
}
