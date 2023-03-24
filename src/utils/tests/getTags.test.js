import getTags from "../getTags";

describe("getTags", () => {
  it("should return an empty array if no filters are provided", () => {
    const filters = [];
    const result = getTags(filters);
    expect(result).toEqual([]);
  });

  it("should return an array of tags for select filters with checked items", () => {
    const filters = [
      {
        name: "category",
        type: "select",
        values: [
          {
            group_name: "Fruit",
            values: [
              { name: "Apple", key: "apple", checked: true },
              { name: "Banana", key: "banana", checked: false },
            ],
          },
          {
            group_name: "Vegetables",
            values: [
              { name: "Carrot", key: "carrot", checked: true },
              { name: "Broccoli", key: "broccoli", checked: true },
            ],
          },
        ],
        tags_ignore: false,
        disabled: false,
      },
      {
        name: "color",
        type: "color",
        values: [
          { name: "Red", key: "red", checked: true },
          { name: "Blue", key: "blue", checked: false },
        ],
        tags_ignore: false,
        disabled: false,
      },
    ];
    const result = getTags(filters);
    expect(result).toEqual([
      {
        type: "select",
        key: "apple",
        name: "Apple",
        title: "Apple",
        param: "category",
        group_name: "Fruit",
      },
      {
        type: "select",
        key: "carrot",
        name: "Carrot",
        title: "Carrot",
        param: "category",
        group_name: "Vegetables",
      },
      {
        type: "select",
        key: "broccoli",
        name: "Broccoli",
        title: "Broccoli",
        param: "category",
        group_name: "Vegetables",
      },
    ]);
  });

  it("should return an array of tags for range filters with changed min and max values", () => {
    const filters = [
      {
        name: "price",
        type: "range",
        values: {
          range: [10, 100],
          min: 0,
          max: 1000,
          postfix: "₽",
          format: "number",
        },
        tags_ignore: false,
        disabled: false,
      },
    ];
    const result = getTags(filters);
    expect(result).toEqual([
      {
        type: "range",
        param: "price",
        changeMin: true,
        min: 0,
        max: 1000,
        range: [10, 100],
        name: "от 10 ₽",
      },
      {
        type: "range",
        param: "price",
        changeMin: false,
        min: 0,
        max: 1000,
        range: [10, 100],
        name: "до 100 ₽",
      },
    ]);
  });

  it("should not return tags for disabled or ignored filters", () => {
    const filters = [
      {
        name: "category",
        type: "select",
        values: [
          {
            group_name: "Fruit",
            values: [
              { name: "Apple", key: "apple", checked: true },
              { name: "Banana", key: "banana", checked: false },
            ],
          },
          {
            group_name: "Vegetables",
            values: [
              { name: "Carrot", key: "carrot", checked: true },
              { name: "Broccoli", key: "broccoli", checked: true },
            ],
          },
        ],
        tags_ignore: true,
        disabled: false,
      },
      {
        name: "color",
        type: "color",
        values: [
          { name: "Red", key: "red", checked: true },
          { name: "Blue", key: "blue", checked: false },
        ],
        tags_ignore: false,
        disabled: true,
      },
    ];
    const result = getTags(filters);
    expect(result).toEqual([]);
  });

  it("should handle filters with non-string key values", () => {
    const filters = [
      {
        name: "rating",
        type: "select",
        values: [
          {
            group_name: "Rating",
            values: [
              { name: "4+", key: 4, checked: true },
              { name: "3+", key: 3, checked: true },
            ],
          },
        ],
        tags_ignore: false,
        disabled: false,
      },
    ];
    const result = getTags(filters);
    expect(result).toEqual([
      {
        type: "select",
        key: 4,
        name: "4+",
        title: "4+",
        param: "rating",
        group_name: "Rating",
      },
      {
        type: "select",
        key: 3,
        name: "3+",
        title: "3+",
        param: "rating",
        group_name: "Rating",
      },
    ]);
  });

  it("should return empty filters with no correct structure", () => {
    const filters = [
      {
        name: "discount",
        type: "checkbox",
        values: [
          { name: "On Sale", key: "on_sale", checked: true },
          { name: "", key: "none", checked: false },
        ],
        tags_ignore: false,
        disabled: false,
      },
    ];
    const result = getTags(filters);
    expect(result).toEqual([]);
  });
});
