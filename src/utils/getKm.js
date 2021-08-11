const rad = (x) => (x*Math.PI/180);

export const getKm = (lon1, lat1, lon2, lat2) => {
    const R = 6378.137; //Radio de la tierra en km
    const dLat = rad( lat2 - lat1 );
    const dLong = rad( lon2 - lon1 );
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    if(d <=0.99999999) return d.toFixed(3) * 1000 + ' m ';
    return d.toFixed(3).split('.').join(',') + ' Km '; 
};