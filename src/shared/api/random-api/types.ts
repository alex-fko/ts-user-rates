
export type UserDto = {
    id: number
    first_name: string
    last_name: string
    address: {
        city: string,
        coordinates: { lat: number, lng: number }
        country: string,
        state: string
        street_name: string,
        street_address: string,
        zip_code: string
    },
    credit_card: { cc_number: string },
    date_of_birth: DateIso,
    email: Email,
    employment: { title: string, key_skill: string },
    gender: string,
    password: string,
    phone_number: Phone,
    social_insurance_number: string,
    subscription: {
        payment_method: string,
        plan: string,
        status: string,
        term: string,
    }
    uid: string,
    username: string

    /**
     * ✅ DX Best Practice
     * Use type aliases for primitive types
     * to improve developer experience
     *
     * @see types/app.d.ts
     */
    avatar: Url,
}