import isEmpty from 'lodash-es/isEmpty';
import isString from 'lodash-es/isString';
import isArray from 'lodash-es/isArray';
export const dealLabel = (label) => {
  if (isEmpty(label)) {
    return []
  } else if (isString(label)) {
    let arr = label.split(',')
    return [...arr]
  } else if (isArray(label)) {
    return [...label]
  }
  return []
}
