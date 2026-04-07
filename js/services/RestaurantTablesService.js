class RestaurantTablesService {
  static async saveOrUpdate(mesas) {
    return await new ApiClient().post(`/tables`, mesas);
  }

  static async getAll() {
    return await new ApiClient().get(`/tables`);
  }

  static async getRestautrantTable(QrToken) {
    return await new ApiClient().get(`/tables/${QrToken}`);
  }
}
