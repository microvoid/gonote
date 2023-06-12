import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function fromNow(time: dayjs.ConfigType) {
  return dayjs(time).fromNow();
}
