import { permissions } from "../services/permissions";
import { geolocation } from "../services/geolocation";

export const myLocation = () => {
    let canceled = false;
    return {
        get: async () => {
                const granted = await permissions('location');
                if(canceled) return null;
                if(granted == 'granted'){
                    const coords = await geolocation();
                    if(canceled) return null;
                    const { latitude, longitude } = coords;
                    return { success: true, data: { latitude, longitude } };
                }
                return { success: false, data: {} };
        },
        cancel: () => canceled = true
    };
};