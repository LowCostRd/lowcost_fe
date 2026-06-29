const FormatTooltipDate = (dateStr: string): string => {
    const months: Record<string, string> = {
      Jan: "January", Feb: "February", Mar: "March",    Apr: "April",
      May: "May",     Jun: "June",     Jul: "July",     Aug: "August",
      Sep: "September", Oct: "October", Nov: "November", Dec: "December",
    };
    const [mon, day] = dateStr.split(" ");
    const year = new Date().getFullYear();
    const d = new Date(`${months[mon]} ${day}, ${year}`);
    const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
    return `${months[mon]} ${day}, ${weekday}`;
  };

  export default FormatTooltipDate;