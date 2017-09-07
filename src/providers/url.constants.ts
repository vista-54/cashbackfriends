let api = "https://app.cashbackfriends.online/";
export const URL =
    {
        login: {
            code: api + 'clients/send_auth_sms',
            token: api +
            'clients/get_token'
        },
        register: {
            registration: api + 'clients/register'
        },
        tabs: {
            getInfo: api + 'clients/get_info'
        },
        invite: {
            getFriends: api + 'clients/get_friends'
        },
        card: {
            getPurchases: api + 'clients/get_purchases',
            getWithdrawals: api + 'clients/withdrawals'
        },
        catalog: {
            getCatalog: api + 'clients/get_city_catalog'
        }
    };