import axios from 'axios';
const baseUrl = 'http://localhost:3000/product';

class productService {
    async allProduct() {
        return await axios.get(`${baseUrl}`);
    }
    async detailProduct(id) {
        return await axios.get(`${baseUrl}/show/${id}`);
    }
    
    async update(id, form) {
        return await axios.put(`${baseUrl}/${id}`, form);
    }

    async remove(id) {
        return await axios.delete(`${baseUrl}/delete/${id}`);
    }

    async createNewProduct(form) {
        return await axios.post(`${baseUrl}/create`, form);
    }
}

export default new productService;