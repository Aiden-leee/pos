// format : yyyy-mm-dd, yyyy-mm-dd h:m:s, yyyy/mm/dd, yyyy/mm/dd h:m:s
function dateFormatter(format) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) {
    hours = `0${hours}`;
  } else if (minutes < 10) {
    minutes = `0${minutes}`;
  } else if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  switch (format) {
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    case "yyyy-mm-dd h:m:s":
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    case "yyyy/mm/dd":
      return `${year}/${month}/${day}`;
    case "yyyy/mm/dd h:m:s":
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    default:
      return "wrong format";
  }
}

exports.dateFormatter = dateFormatter;
