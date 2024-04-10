export const convertArrayToTwoDigitTime = (arrayOfTimes: any) => {
  let formattedTimes = arrayOfTimes.map((time: number) => {
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    // Convert to two-digit format
    let formattedHours = ("0" + hours).slice(-2);
    let formattedMinutes = ("0" + minutes).slice(-2);
    let formattedSeconds = ("0" + seconds).slice(-2);

    // Return formatted time
    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
    // return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  });

  return formattedTimes;
};
