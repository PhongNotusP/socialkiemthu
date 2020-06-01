import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { profileSaga } from "./profileSaga";
import { postSaga } from "./postSaga";
import { friendSaga } from "./friendSaga";
import { roomSaga } from "./roomSaga";
export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), postSaga(), friendSaga(), roomSaga()]);
}
