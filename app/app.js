import Vue from 'nativescript-vue'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

import App from "./src/App";

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
'fa': './assets/font-awesome.css'
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);




Vue.filter('fonticon', fonticon);

new Vue({
    render: h => h(App)
}).$start();
