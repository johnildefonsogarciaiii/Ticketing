

export default function FormatDate(timeStamp){

    const date = new Date(timeStamp.toLocaleString())
    // const date = new Date(timeStamp).toISOString();



    const year = date.getFullYear();
    const month = String(date.getMonth() +1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formatDate = new Intl.DateTimeFormat("en", {
        date: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit" 
    }).format(new Date(timeStamp));

    return formatDate;
}