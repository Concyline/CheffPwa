class RestaurantTablesController {
  static async saveOrUpdate(mesas) {
    try {

      if (!mesas || mesas.length === 0) {
        return {
          success: false,
          message: "Adicione pelo menos uma mesa para salvar!",
        };
      }

      const response = await RestaurantTablesService.saveOrUpdate(mesas);

      if (!response?.Success) {
        return { success: false, message: response?.Message };
      }

      return { success: true, message: response.Message, data: response.Data };
    } catch (e) {
      return { success: false, message: ErrorHelper.getMessage(e) };
    }
  }

  static async getAll() {
    try {
      const response = await RestaurantTablesService.getAll();

      if (!response?.Success) {
        return { success: false, message: response?.Message };
      }

      return { success: true, message: response.Message, data: response.Data };
    } catch (e) {
      return { success: false, message: ErrorHelper.getMessage(e) };
    }
  }

  static async getRestautrantTable(QrToken) {
    try {
      const response =
        await RestaurantTablesService.getRestautrantTable(QrToken);

      if (!response?.Success) {
        return { success: false, message: response?.Message };
      }

      return { success: true, message: response.Message, data: response.Data };
    } catch (e) {
      return { success: false, message: ErrorHelper.getMessage(e) };
    }
  }
}
