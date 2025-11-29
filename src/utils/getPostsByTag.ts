import flattenDeep from 'lodash-es/flattenDeep';
import {dealLabel} from './dealLabel';

const getPostsByTag = (posts, tag: string) =>
  posts.filter(post => flattenDeep(dealLabel(post.data.tags)).includes(tag))
export default getPostsByTag;
