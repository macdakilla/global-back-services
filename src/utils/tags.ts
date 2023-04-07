import {
  Filter,
  FilterGroup,
  FilterItem,
  FilterType,
  RequestData,
  RequestItem,
} from "../store/filter/types/state";
import { isNotEmptyArray, isNumber, isString } from "../helpers";
import { getFormat } from "../utils";

export interface Tag {
  type: FilterType;
  key?: string | number;
  name: string;
  title?: string;
  param: string;
  group_name?: string;
}
export interface RangeTag extends Omit<Tag, "name"> {
  name: string;
  changeMin: boolean;
  min: number;
  max: number;
  range: [number, number];
}

function createDefaultTag(
  filter: Filter,
  group: FilterGroup,
  item: FilterItem
): Tag | undefined {
  if (!item.checked) return undefined;
  return {
    type: filter.type,
    key: isString(item.key) ? item.key.toLowerCase() : item.key,
    name: item.name,
    title: item.name,
    param: filter.name,
    group_name: group.group_name,
  };
}
function createRangeTags(filter: Filter): RangeTag[] | undefined {
  if (Array.isArray(filter.values)) return undefined;
  const tags: RangeTag[] = [];
  const {
    values: { format, postfix, min, max, range },
    type,
    name: param,
  } = filter;
  if (min !== range[0]) {
    const name = `от ${getFormat(range[0], format)} ${postfix}`;
    tags.push({
      changeMin: true,
      type,
      param,
      min,
      max,
      range,
      name,
    });
  }
  if (max !== range[1]) {
    const name = `до ${getFormat(range[1], format)} ${postfix}`;
    tags.push({
      changeMin: false,
      type,
      param,
      min,
      max,
      range,
      name,
    });
  }
  return tags;
}

export function getTags(filters: Filter[]): Tag[] {
  const tags: Tag[] = [];

  filters.forEach((filter) => {
    if (filter.tags_ignore || filter.disabled) return;
    if (
      [FilterType.CHECKBOX, FilterType.COLOR, FilterType.SELECT].includes(
        filter.type
      ) &&
      Array.isArray(filter.values)
    ) {
      filter.values.forEach((group: FilterGroup) => {
        if (!Array.isArray(group.values)) return;
        group.values.forEach((item: FilterItem) => {
          const tag = createDefaultTag(filter, group, item);
          if (tag) tags.push(tag);
        });
      });
    }
    if (filter.type === FilterType.RANGE) {
      const rangeTags = createRangeTags(filter);
      if (rangeTags && rangeTags.length) tags.push(...rangeTags);
    }
  });

  return tags;
}

function createDataForRemoveTag(
  tag: Tag,
  requestData: RequestData
): RequestItem {
  if (!isNotEmptyArray(requestData[tag.param])) return requestData[tag.param];
  // @ts-ignore
  const newParamData = [...requestData[tag.param]];
  newParamData.splice(
    newParamData.indexOf(isNumber(tag.key) ? +tag.key : tag.key),
    1
  );
  return newParamData;
}
function createDataForRemoveRangeTag(
  tag: RangeTag,
  requestData: RequestData
): RequestItem {
  return tag.changeMin
    ? // @ts-ignore
      [tag.min, requestData[tag.param][1]]
    : // @ts-ignore
      [requestData[tag.param][0], tag.max];
}
export function removeTag(
  tag: Tag | RangeTag,
  requestData: RequestData
): RequestItem {
  if (
    [FilterType.CHECKBOX, FilterType.COLOR, FilterType.SELECT].includes(
      tag.type
    )
  ) {
    return createDataForRemoveTag(tag as Tag, requestData);
  } else if (tag.type === FilterType.RANGE) {
    return createDataForRemoveRangeTag(tag as RangeTag, requestData);
  }
  return requestData[tag.param];
}
