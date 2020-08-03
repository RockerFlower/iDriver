// Copyright 2016 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');

const drive = google.drive('v3');

async function runDriver(filePath, keyPath, destID) {


    const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    google.options({ auth });

    const fileSize = fs.statSync(filePath).size;
    const res = await drive.files.create(
        {
            requestBody: {
                parents: [destID],
                name: filePath.split('/')[filePath.split('/').length - 1],
                description: filePath.toString(),
            },
            media: {
                body: fs.createReadStream(filePath),
            },
        },
        {
            // Use the `onUploadProgress` event from Axios to track the
            // number of bytes uploaded to this point.
            onUploadProgress: evt => {
                const progress = (evt.bytesRead / fileSize) * 100;
                readline.clearLine();
                readline.cursorTo(0);
                process.stdout.write(`${Math.round(progress)}% complete\n`);
            },
        }
    );
    console.log(res.data);
    return res.data;
}

// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
    const filePath = process.argv[2];
    const keyPath = process.argv[3];
    const destID = process.argv[4];
    runDriver(filePath, keyPath, destID).catch(console.error);
}
module.exports = runDriver;
