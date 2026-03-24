class DishService {

    static async getDishes(RestaurantId) {
        return await new ApiClient().get(`/dish/${RestaurantId}`);
    }
}