/*
 * @Author: xiaoyown 
 * @Date: 2021-08-30 00:01:15 
 * @Last Modified by: xiaoyown
 * @Last Modified time: 2021-08-30 00:10:02
 */

export const DATASOURCE_TYPE_LIST = [
  {
    label: '外部数据源',
    value: 'OUT',
  },
];

export const ACCESS_METHOD_LIST = [
  {
    label: 'http',
    value: 'HTTP',
  },
  {
    label: '数据库直连',
    value: 'DATABASE',
  },
];

export const METHOD_LIST = [
  {
    label: 'GET',
    value: 'GET',
  },
  {
    label: 'POST',
    value: 'POST',
  },
  {
    label: 'PUT',
    value: 'PUT',
  },
  {
    label: 'DELETE',
    value: 'DELETE',
  },
];

export const PARAM_DATA_TYPES = [
  {
    value: 'STRING',
    label: '字符串',
    typeLabel: '基础类型'
  },
  {
    value: 'BOOLEAN',
    label: '布尔值',
    typeLabel: '基础类型'
  },
  {
    value: 'NUMBER',
    label: '数字',
    typeLabel: '基础类型'
  },
  {
    value: 'OBJECT',
    label: '对象',
    typeLabel: '基础类型'
  },
  {
    value: 'ARRAY',
    label: '数组',
    typeLabel: '基础类型'
  },
];
