export const loginUser = ({ email, password }) =>
        async (dispatch) => {
            return new Promise((resolve, reject) => {
                ApiService.post('v1/login', { email, password })
                    .then((response) => {
                        const { token, customer } = response.data;
                        dispatch(setCustomerData(prepareCustomer(customer)));
                        setAuthCookie(token);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        dispatch(setCustomerData({}));
                        setAuthCookie('');
                        reject(error);
                    });
            });
        };