class RestaurantTablesService {

    static async getRestautrantTable(QrToken) {
        return await new ApiClient().get(`/tables/${QrToken}`);
    }
}