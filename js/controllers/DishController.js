class DishController {

    static async getDishes(RestaurantId) {

        try {

            const response = await DishService.getDishes(RestaurantId);

            if (!response?.Success) {
                return { success: false, message: response?.Message };
            }

            return { success: true, message: response.Message, data: response.Data };

        } catch (e) {
            return { success: false, message: ErrorHelper.getMessage(e) };
        }

    }

}