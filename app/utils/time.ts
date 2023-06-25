import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);

export function fromNow(input: dayjs.ConfigType) {
  const time = dayjs(input);

  if (time.isToday()) {
    return time.fromNow();
  }

  return time.format("L LT");
}
