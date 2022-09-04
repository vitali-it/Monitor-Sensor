export class AuthDto {
    token: string;
    role: string;

    public static convert(response: any): AuthDto {
        if (!response) {
            return null;
        }

        const dto = new AuthDto();
        dto.token = response.token;
        dto.role = response.role;
        return dto;
    }
}
