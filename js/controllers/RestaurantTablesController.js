class RestaurantTablesController {

    static async getRestautrantTable(QrToken) {

        try {

            const response = await RestaurantTablesService.getRestautrantTable(QrToken);

            if (!response?.Success) {
                return { success: false, message: response?.Message };
            }

            return { success: true, message: response.Message, data: response.Data };

        } catch (e) {
            return { success: false, message: ErrorHelper.getMessage(e) };
        }

    }

}