import axios from "axios";
const SERVER_URL = '';

interface UpdateCustomer{
    id: string,
    name: string,
    email: string,
    phone: string,
}

export const getCustomer = async () => {
    const resp = await axios.get(`${SERVER_URL}/api/customers`);
    return resp.data;
};

export const createCustomer = async (data: UpdateCustomer) => {
    const resp = await axios.post(`${SERVER_URL}/api/customers`, data);
    return resp.data;
};


export const updateCustomer = async (email: number, data: UpdateCustomer) => {
    const resp = await axios.put(`${SERVER_URL}/api/customers/${email}`, data);
    return resp.data;
};

export const deleteCustomer = async (email: string) => {
    const resp = await axios.delete(`${SERVER_URL}/api/customers/${email}`);
    return resp.data;
};