import request from '@/utils/request';
import { Global } from '@/utils/global';

export const login = (data) => {
    return request({
        url: Global.BASE_API_URL + '/login',
        method: 'post',
        data
    });
};
