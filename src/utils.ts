export function formatDate(dateString?: string): string {
    if (!dateString) return "N/A";
  
    const finishDate = new Date(dateString);
    if (isNaN(finishDate.getTime())) return "N/A"; // Handle invalid dates
  
    return `${String(finishDate.getDate()).padStart(2, "0")}.${String(finishDate.getMonth() + 1).padStart(2, "0")}.${finishDate.getFullYear()} ${String(finishDate.getHours()).padStart(2, "0")}:${String(finishDate.getMinutes()).padStart(2, "0")}`;
}

export function getNowAsString() {
    const date = new Date();
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }