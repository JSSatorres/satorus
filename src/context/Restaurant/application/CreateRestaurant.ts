import { injectable, inject } from "tsyringe"
import { Restaurant } from "../domain/Restaurant"
import { RestaurantRepository } from "../domain/RestaurantRepository"

export interface CreateRestaurantRequest {
  id: string
  email: string
  password?: string
  isGoogleRegistered: boolean
  name?: string
}

@injectable()
export class CreateRestaurant {
  constructor(
    @inject("RestaurantRepository") private restaurantRepository: RestaurantRepository
  ) {}

  async execute(request: CreateRestaurantRequest): Promise<Restaurant> {
    const restaurant = request.isGoogleRegistered
      ? Restaurant.createWithGoogle(request.id, request.email, request.name)
      : Restaurant.createWithEmailPassword(
          request.id,
          request.email,
          request.password!,
          request.name
        )

    return await this.restaurantRepository.save(restaurant)
  }
}
