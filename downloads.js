const http = require('http');
const fs = require('fs');
const exec = require('child_process').exec;
const os = require('os');

const setBackgroundWallpaper = function ( imgPath, cb ) {
	let cmd = `osascript -e 'tell application "Finder" to set desktop picture to POSIX file "${imgPath}"'`;
	exec(cmd, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		if ( cb ) {
			cb();
		}
	})
};

module.exports.downloadFile = (filename, url, callback) => {
	let filePath = `${os.homedir()}/Downloads/${filename}`;
	let stream = fs.createWriteStream( filePath );
	http.get(url.replace('https://', 'http://'), resp => {

		const totalSize = parseInt(resp.headers['content-length'], 10);
		let currentSize = 0;
		let percent = 0;
		let state = false;
		resp.pipe(stream);

		resp.on('data', chunk => {
			currentSize += chunk.length;
			percent = (100 * currentSize / totalSize).toFixed(2);
			callback({ percent: percent, state: state });
		});

		resp.on('end', () => {
			state = true;
			setBackgroundWallpaper(filePath, () => {
				callback({ percent: percent, state: state });
			});
			stream.close();
		});
	});
}
