import { enumToJson, fenToYuan, toDateString, http } from '@/common/utils'

const enums = {
  status: [
    { label: '仓库中', value: 1 },
    { label: '已下架', value: 2 },
    { label: '上架中', value: 3 },
  ],
  type: [
    { label: '实物商品', value: 1 },
    { label: '虚拟商品', value: 2 },
  ],
}

export class Goods {
  static schemas = {
    search: {
      name: {
        title: '商品名称',
        type: 'string',
      },
      '[minPrice, maxPrice]': {
        title: '价格区间',
        type: 'number-range',
      },
      status: {
        title: '商品状态',
        type: 'number',
        enum: [{ label: '全部', value: 0 }, ...enums.status],
      },
    },
    create: {
      name: {
        title: '商品名称',
        type: 'string',
      },
      type: {
        title: '商品类型',
        type: 'number',
        enum: enums.type,
      },
      price: {
        title: '商品价格',
        type: 'number',
      },
    },
  }

  id: number
  name: string
  img: string
  status: 1 | 2 | 3
  statusName: string
  type: 1 | 2
  typeName: string
  price: number
  fixedPrice: string
  createdAt: string
  createdAtString: string
  canDelete: boolean

  constructor({ id, img, name, status, type, price, createdAt }) {
    this.id = id
    this.img = img
    this.name = name
    this.status = status
    this.type = type
    this.price = price
    this.createdAt = createdAt
    // 转换数据
    this.statusName = enumToJson(enums.status)[status]
    this.typeName = enumToJson(enums.type)[type]
    this.fixedPrice = fenToYuan(price)
    this.createdAtString = toDateString(createdAt)
    // 逻辑判断
    this.canDelete = [1, 2].includes(status)
  }
}

export class GoodsService {
  static getGoodsList = async params => {
    const { data } = await http.get('/goods', { params })
    const { total, list } = data
    return { total, list: list.map(it => new Goods(it)) }
  }
}
