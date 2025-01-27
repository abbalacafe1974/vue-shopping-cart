import emitter from '@/libs/emitter';

export default (success, content) => {
  emitter.emit('push-message', {
    style: success === true ? 'success' : 'danger',
    title: success === true ? '成功' : '失敗',
    content,
  });
};
