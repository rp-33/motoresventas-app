
export const cancellablePromise = (promise, success) => {
    let canceled = false;

    return {
        get: async (...params) => {
           try {
                const { status, data } = await promise(...params);
                if(canceled) return null;
                if(status === success) return { success: true, data };
                else return { success: false, data: { error: data.error || 'Error en el servidor' } };
           } catch (error) {
                if(canceled) return null;
                return { success: false, data: { error: 'Error en el servidor' } };
           }
        },
        cancel: () => canceled = true
    };
};


