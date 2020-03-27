namespace Response {
  export interface List<Item> {
    data: {
      rows: Item[]
      totalCount?: number
    }
  }

  export interface Detail<Item> {
    data: Item
  }
}

export interface EnumItem {
  label: string
  value: string | number
}
