import {Toast} from "native-base";

export async function ShowErrorNotification(text = "An error occured", duration = 5000) {
    return await Toast.show({
        text: text,
        type: "danger",
        buttonText: "Okay",
        duration: duration
    });
}

export async function ShowSuccessNotification(text = "Update successful.", duration = 5000) {
    return await Toast.show({
        text: text,
        type: "success",
        buttonText: "Okay",
        duration: duration
    });
}
