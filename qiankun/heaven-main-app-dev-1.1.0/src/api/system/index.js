import request from '@/utils/request';
import { Global } from '@/utils/global';

export const getMicroApps = (data) => {
    return request({
        url: Global.BASE_API_URL + '/getMicroApps',
        method: 'post',
        data
    });
};
