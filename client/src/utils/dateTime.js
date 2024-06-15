//Function to get current time

export function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be displayed as "12"

    // Add leading zero to single-digit minutes
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted time string
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return formattedTime;
}

// Function to get current date
export function getFormattedDate() {
    const months = [
      'Jan', 'Feb', 'March', 'April', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const now = new Date();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const monthName = months[monthIndex];
    const year = now.getFullYear();

    const formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
  }