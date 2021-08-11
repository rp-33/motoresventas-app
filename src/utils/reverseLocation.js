import { reverseGeolocation } from "../services/api";

export const reverseLocation = () => {
    let canceled = false;
    return {
        get: async (longitude, latitude) => {
                try {
                    const reverse = await reverseGeolocation(longitude, latitude);
                    if(canceled) return null;
                    return { success: true, data: reverse.results[0].locations[0] };
                } catch (error) {
                    if(canceled) return null;
                    return { success: false, data: {} };
                }
        },
        cancel: () => canceled = true
    };
};