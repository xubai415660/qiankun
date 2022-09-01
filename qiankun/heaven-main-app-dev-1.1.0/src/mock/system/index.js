import { Global } from '@/utils/global';
const Mock = require('mockjs');

Mock.mock(Global.BASE_API_URL + '/getMicroApps', 'post', require('./menu.json'));
