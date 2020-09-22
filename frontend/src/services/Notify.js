import toastr from 'toastr';

const configs = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-bottom-left',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const Notify = {
  warning: (body, title = '') => toastr.warning(body, title, configs),
  success: (body, title = '') => toastr.success(body, title, configs),
  error: (body, title = '') => toastr.error(body, title, configs),
  info: (body, title = '') => toastr.info(body, title, configs),
};

export default Notify;
