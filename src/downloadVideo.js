import { request } from 'http';

function downloadVideo(payload) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/download_video',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const req = request(options, (res) => {
            res.on('data', (d) => {
                console.log(d.toString());
                resolve(d.toString());
            });

            res.on('end', (e) => {
                console.log(`statusCode: ${res.statusCode}`);
            });
        });

        req.on('error', (error) => {
            console.error(error);
        });

        req.write(payload);
        req.end();
    })
}

export default downloadVideo;
