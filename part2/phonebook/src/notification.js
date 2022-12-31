const Notification = ({notificationMsg}) => {
    if(notificationMsg === null) return;
    return (
        <h1 className="successfulOperation">
            {notificationMsg}
        </h1>
    )
}

const Error = ({error}) => {
    if(error === null) return;
    return (
        <h1 className="errorMsg">

        </h1>
    )
}

export {Notification, Error};