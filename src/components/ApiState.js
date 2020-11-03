import React from 'react';

export default function ApiState({isLoading, isSuccess, isError, errorMessage}) {
    return <>
        {isLoading && 'Подождите...'}
        {isSuccess && 'Успех!'}
        {isError && errorMessage}
    </>;
}
