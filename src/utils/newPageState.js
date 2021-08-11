import { Toast } from "native-base";

export const newPageState = (preState, response, message='No se encontraron resultados') => {
    const { data, refreshing, page } = preState
    const { success, data: newData } = response;
    let newState = {...preState, loading: false, refreshing: false};
    
    if(success) {
        if(newData.length===0){
            newState.noMore = true;
            if(page===0) {
                Toast.show({
                    text: message,
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Cerrar",
                    duration: 3000,
                    type: 'warning'
                });
            }
        };
        if(refreshing) newState.data = [...newData];
        else newState.data = [...data, ...newData];
    } else Toast.show({
        text: newData.error,
        textStyle: { fontSize: 15  },
        buttonTextStyle: { color: '#000000', fontSize: 15 },
        buttonText: "Cerrar",
        duration: 3000,
        type: "danger"
    });
    return newState
};

export const newState = (preState, response) => {
    const { success, data } = response;
    let newState = {...preState, loading: false};
    if(success) newState.data = [...data];
    else Toast.show({
        text: data.error,
        textStyle: { fontSize: 15  },
        buttonTextStyle: { color: '#000000', fontSize: 15 },
        buttonText: "Cerrar",
        duration: 3000,
        type: "danger"
    });
    return newState
}