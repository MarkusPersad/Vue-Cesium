export function getLocation() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => {
                console.error(`获取位置失败:${error.message}`);
                reject('获取位置失败');
            });
        } else {
            console.error('浏览器不支持"geolocation"');
            reject('浏览器不支持"geolocation"');
        }
    });
}