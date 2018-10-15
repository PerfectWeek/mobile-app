import {takeEvery, call, take, put, select} from "redux-saga/effects";
import {Test} from "./test.actions";
import {TestType} from "./test.actions";
import {END, eventChannel} from "redux-saga";


function* Test_loop() {
    const testChannel = yield call(Test_do);
    try {
        while (true) {
            const event = yield take(testChannel);
            yield put(event);
        }
    }
    finally {
        testChannel.close();
    }
}

function* Test_do() {
    return eventChannel((emit) => {
        console.log('Je suis le Saga bien jouai !');
        setTimeout(() => {
            emit(Test());
            emit(END);
        }, 3000);
        return () => {
        };
    });
}

export function* testSagas() {
    yield takeEvery(TestType.Test, Test_loop);
}