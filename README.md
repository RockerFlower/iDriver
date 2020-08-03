# iDriver action

This action help you to upload file to Google Drive and return FileID.

## Inputs

### `filePath`

**Required** 

### `keyPath`

**Required** 

### `destID`

**Required** 

## Outputs

### `fileID`

The ID of file in Google Drive.

## Example usage

```
uses: actions/idriver-action@v1
with:
  filePath: 'build/apk/app-release.apk'
  keyPath: 'service_account_key.json'
  destID: '18FmIo1Sg1GafCViyyLTJBuD0txb9FGIV'
```