export class ApiResponse<T = void>
{
    public errorMessage!: ApiResponseMessage;
    public successMessage!: ApiResponseMessage;
    public obj!: T;
    public title: string | undefined
}

export class ApiResponseMessage {
    public code!: number;
    public text!: string;
    public title: string | undefined
}
