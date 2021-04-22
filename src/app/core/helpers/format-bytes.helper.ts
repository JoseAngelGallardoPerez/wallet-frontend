const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
const k = 1024;
const dm = 2;

const FormatBytes = (bytes: number): string => {
  if (!bytes || bytes === 0) {
    return '0 Byte';
  }
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export {
  FormatBytes,
};
