import { Global } from '@/utils/global';
const Mock = require('mockjs');

Mock.mock(Global.BASE_API_URL + '/login', 'post', {
    data: {
        'operName': '@cname',
        'operId': '@uuid',
        'orgNo': '41101',
        'orgName': '国网河南省电力公司',
        'deptNo': '0000005403',
        'deptName': '',
        'token': '@uuid'
    },
    code: 200
});
