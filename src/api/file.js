import { post, get, del, put } from '@/utils/request'

const requestPrefix = '/estateApi'

// 上传附件
export const uploadFile = (params, config) => {
  return post(`${requestPrefix}/mongofile/upload`, params, config)
}

// 删除附件
export const delFile = (params, config) => {
  return post(`${requestPrefix}/mongofile/deleteFile`, params, config)
}

// 下载附件
export const downloadFile = (params, config) => {
  return post(`${requestPrefix}/mongofile/deleteFile`, params, config)
}

// 查看附件
export const viewFile = (params, config) => {
  return post(`${requestPrefix}/mongofile/mongoId`, params, config)
}

// 获取附件列表
export const getFileList = (params, config) => {
  return get(`${requestPrefix}/mongofile/getFile`, params, config)
}
