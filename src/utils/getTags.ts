import {
  Filter,
  FilterGroup,
  FilterItem,
  FilterType,
} from "../store/filter/types/state";
import { isString } from "../helpers";

interface RangeTags extends Omit<Tags, "name"> {
  name: string;
  changeMin: boolean;
  min: number;
  max: number;
  range: [number, number];
  id?: number;
}

interface Tags {
  type: FilterType;
  key?: string | number;
  name: string;
  title?: string;
  param: string;
  group_name?: string;
}

function getFormat(val: number | string, format = "number"): string {
  if (isNaN(+val)) return "";
  if (format === "number") {
    return new Intl.NumberFormat("ru-RU").format(+val);
  }
  return val.toString();
}

function getTags(filters: Filter[]): Tags[] {
  const tags: Tags[] = [];

  filters.forEach((filter) => {
    if (
      ["checkbox", "color", "select"].includes(filter.type) &&
      !filter.tags_ignore &&
      !filter.disabled &&
      Array.isArray(filter.values)
    ) {
      filter.values.forEach((group: FilterGroup) => {
        if (!Array.isArray(group.values)) return;
        group.values.forEach((item: FilterItem) => {
          if (item.checked) {
            tags.push({
              type: filter.type,
              key: isString(item.key) ? item.key.toLowerCase() : item.key,
              name: item.name,
              title: item.name,
              param: filter.name,
              group_name: group.group_name,
            });
          }
        });
      });
    }

    if (
      filter.type === "range" &&
      !filter.tags_ignore &&
      !filter.disabled &&
      !Array.isArray(filter.values)
    ) {
      const { values } = filter;
      const { format, postfix } = values;

      if (values.min !== values.range[0]) {
        const name = `от ${getFormat(values.range[0], format)} ${postfix}`;

        tags.push({
          type: filter.type,
          param: filter.name,
          changeMin: true,
          min: values.min,
          max: values.max,
          range: values.range,
          name,
        } as RangeTags);
      }

      if (values.max !== values.range[1]) {
        const name = `до ${getFormat(values.range[1], format)} ${postfix}`;

        tags.push({
          type: filter.type,
          param: filter.name,
          changeMin: false,
          min: values.min,
          max: values.max,
          range: values.range,
          id: filter.id,
          name,
        } as RangeTags);
      }
    }
  });

  return tags;
}

export default getTags;
