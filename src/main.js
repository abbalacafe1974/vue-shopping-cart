import { createApp } from 'vue';
// bootstrap js
import 'bootstrap';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
// 引入 animate.css
import 'animate.css'; // 引入 animate.css
// fortawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCartShopping,
  faHeart,
  faPhone,
  faHouse,
  faEnvelope,
  faUserGear,
  faCartPlus,
  faMagnifyingGlass,
  faTicket,
  faBus,
  faXmark,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faMinus,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// vee-validate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// all.scss
import './assets/stylesheets/all.scss';
import './assets/stylesheets/custom.scss';

import App from './App.vue';
import router from './router';

library.add(
  faCartShopping,
  faHeart,
  faPhone,
  faHouse,
  faEnvelope,
  faFacebook,
  faInstagram,
  faGithub,
  faUserGear,
  faCartPlus,
  faMagnifyingGlass,
  faTicket,
  faBus,
  far,
  faXmark,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faMinus,
  faChevronUp,
  faChevronDown,
);

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

configure({
  generateMessage: localize({
    zhTW,
  }),
  validateOnInput: true,
});

setLocale('zhTW');
// AOS init
AOS.init();

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VueAxios, axios);
app.use(router);
app.use(AOS);
app.component('Loading', Loading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
